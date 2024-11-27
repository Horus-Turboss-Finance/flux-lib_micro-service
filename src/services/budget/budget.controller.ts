import { utils, middleware, ResponseException, Timepiece } from "packages";
import { CategorieSchema } from "../category/categorie.models";
import { BudgetSchema } from "./budget.models";

let { catchSync } = middleware;
let { isValidMongooseId, mongooseMessageErrorFormator, dateCheck, intCheck } = utils

export const GetBudgetById = catchSync(async (req : any) => {
  let { id } = req.params ?? 0

  if(!utils.isValidMongooseId(id)) throw new ResponseException("Invalide id").BadRequest();

  let budget = await BudgetSchema.findById(id)

  if(!budget) throw new ResponseException("Aucun budget trouvé").NotFound()

  /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
  if(req.userID !== budget.auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation pour consulter cette information").Forbidden();

  let Responses = JSON.stringify(BudgetNormalizer(budget))
  throw new ResponseException(Responses).Success();
})

export const GetBudgetByDate = catchSync(async (req : any) => {
  let { month, year } = req.params ?? 0;

  if(month && !intCheck(month)) throw new ResponseException("Le mois est un nombre").BadRequest();
  if(year && !intCheck(year)) throw new ResponseException("L'année est un nombre").BadRequest();

  let dateStart = new Date(year, month).getTime()
  let dateEnd = new Date(year, month + 1).getTime()

  const budgets = await BudgetSchema.find({
    $and : [
      { auth : req.userID},
      { date : { $gt : dateEnd}},
      { date : { $lte : dateStart}}
    ]
  })

  let Responses = JSON.stringify(budgets.map((b : any) => BudgetNormalizer(b)))
  throw new ResponseException(Responses).Success();
})

export const GetAllUserBudget = catchSync(async (req : any) => {
  const budgets = await BudgetSchema.find({
    auth : req.userID
  });

  if(!budgets[0]) throw new ResponseException("Aucun budget trouvé").NotFound()

  /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
  if(req.userID !== budgets[0].auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation pour consulter cette information").Forbidden();

  let Responses = JSON.stringify(budgets.map((b : any) => BudgetNormalizer(b)))
  throw new ResponseException(Responses).Success()  
})

export const CreateBudget = catchSync(async (req : any) => {
  let { categorie, montant, date, devise } = req.body ?? 0;

  if(!isValidMongooseId(categorie)) throw new ResponseException("L'id de la catégorie n'est pas valide").BadRequest();
  if(date && dateCheck(date)) date = new Date(date).getTime();

  let resultCategorie = await CategorieSchema.findById(categorie)

  if(!resultCategorie) throw new ResponseException("La catégorie n'éxiste pas").NotFound();

  /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
  if(req.userID !== resultCategorie.auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation d'enregistrer cette information").Forbidden();

  try{
    let budget = new BudgetSchema({
      auth : req.userID,
      categorie,
      montant,
      devise,
      date,
    })

    let err = budget.validateSync();
    if(err) throw err;

    await budget.save()

    let Responses = JSON.stringify(BudgetNormalizer(budget))
    throw new ResponseException(Responses).OK();
  }catch(e : any){
    if(!e.name || e.name !== "ValidationError") throw e;
      
    if(e.errors.auth){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.auth.message, e.errors.auth.value, "Auth", "id"))
      .BadRequest();
    }

    if(e.errors.date){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.date.message, e.errors.date.value, "Date", "unix"))
      .BadRequest();
    }

    if(e.errors.montant){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.montant.message, e.errors.montant.value, "Montant", "number"))
      .BadRequest();
    }

    if(e.errors.devise){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.devise.message, e.errors.devise.value, "Devise", "EUR|USD|GBP|CAD"))
      .BadRequest();
    }
  }
})

export const CreateTransactionBudget = catchSync(async (req : any) => {
  let { date, montant, from, to } = req.body;

  if(!isValidMongooseId(from) || !isValidMongooseId(to)) throw new ResponseException("L'id du budget dans les paramètres from ou to est invalide").BadRequest();

  let fromBud = BudgetSchema.findById(from);
  let toBud = BudgetSchema.findById(to);

  let fromBudData : any = await fromBud;
  let toBudData : any = await toBud;

  if(!fromBudData || !toBudData) throw new ResponseException("L'id du budget dans les paramètres from ou to est incorrecte").BadRequest();

  /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
  if(fromBudData.auth !== req.userID || toBudData.auth !== req.userID) throw new ResponseException("Vous n'êtes pas autorisé à enregistrer ces informations").Forbidden();

  if(date && !dateCheck(date)) throw new ResponseException("La date est invalide").BadRequest();


  /* TODO : à tester car pas sur que ça réussisse sans crash */
  let Response = JSON.stringify([fromBudData, toBudData].map((v: any)=> BudgetNormalizer(v)))
  
  if(!fromBudData.history[0]) fromBudData.history = [];
  fromBudData.history.push({
    montant,
    from,
    date,
    to
  });

  let errfrom = fromBudData.validate()

  if(!toBudData.history[0]) toBudData.history = [];
  toBudData.history.push({
    montant,
    from,
    date,
    to
  });

  let errto = toBudData.validate()

  try{
    let resultfrom = await errfrom;
    let resultto = await errto;

    if(resultfrom) throw resultfrom;
    if(resultto) throw resultto;

    await toBudData.save()
    await fromBudData.save()
  }catch(e){
    throw e
  }

  throw new ResponseException(Response).OK()
})

export const UpdateBudget = catchSync(async (req : any) => {
  let { montant, devise, id } = req.body ?? 0;

  let budget = await BudgetSchema.findById(id);
  if(!budget) throw new ResponseException("L'identifiant est invalide").NotFound();

  if(req.userID !== budget.auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation de modifier cette information");

  try{
    if(montant) budget.montant = montant;
    if(devise) budget.devise = devise;
    
    let err = budget.validateSync();
    if(err) throw err;

    await budget.save()

    let Responses = JSON.stringify(BudgetNormalizer(budget));
    throw new ResponseException(Responses).Success();
  }catch(e : any){
    if(!e.name || e.name !== "ValidationError") throw e
    if(e.errors.montant){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.montant.message, e.errors.montant.value, "Montant", "number"))
      .BadRequest();
    }

    if(e.errors.devise){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.devise.message, e.errors.devise.value, "Devise", "EUR|USD|GBP|CAD"))
      .BadRequest();
    }
  }
})

export const DeleteBudget = catchSync(async (req : any) => {
  let { id } = req.body;

  let budget = await BudgetSchema.findById(id)
  if(!budget) throw new ResponseException("Aucun budget trouvé").NotFound();

  if(req.userID !== budget.auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation de modifier cette information");

  await budget.deleteOne();

  throw new ResponseException("Budget supprimé").Success()
})

const BudgetNormalizer = (budgetData : any) => {
  let { categorie, montant, date, devise, history, _id } = budgetData

  if(history[0]){
    history = history.map((obj : any) => obj.date = new Date(obj.date))
  }

  return {
    dateDate : new Timepiece("fr", date).longDateTime(),
    history : history ?? [],
    dateTime : date,
    categorie,
    id : _id,
    montant,
    devise,
  }
}