import { utils, middleware, ResponseException, Timepiece } from "packages";
import { CategorieSchema } from "../category/categorie.models";
import { TransactionSchema } from "./transactions.model";
import { WalletSchema } from "../wallet/wallet.model";

let { catchSync } = middleware;
let { mongooseMessageErrorFormator, isValidMongooseId, dateCheck, intCheck } = utils;

export const GetTransactionById = catchSync(async (req : any) => {
  let { id } = req.params ?? 0

  let transaction = await TransactionSchema.findById(id)
  if(!transaction) throw new ResponseException("Aucune transaction trouvée").NotFound()

  /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
  if(req.userID !== transaction.auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation pour consulter cette information").Forbidden();

  let Responses = JSON.stringify(TransactionNormalizer(transaction))
  throw new ResponseException(Responses).Success();
})

export const GetAllUserTransaction = catchSync(async (req : any) => {
  let { page } = req.query ?? 0;

  let params = { limit : 100, skip : 0};
  if(page && intCheck(page)) params.skip = page * 100;

  let transactions = await TransactionSchema.find({
    auth : req.userID
  }, null, params);


  if(!transactions[0]) throw new ResponseException("Aucune transactions trouvé").NotFound()

  /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
  if(req.userID !== transactions[0].auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation pour consulter cette information").Forbidden();

  let Responses = JSON.stringify(transactions.map((b : any) => TransactionNormalizer(b)))
  throw new ResponseException(Responses).Success()  
})

export const GetTransactionByDate = catchSync(async (req : any) => {
  let { month, year } = req.params ?? 0;

  if(!month || !year) month = new Date().getMonth(), year = new Date().getFullYear()

  if(!intCheck(month) || !intCheck(year)) throw new ResponseException("Le mois et l'année sont des nombres").BadRequest()

  let dateStart = new Date(year, month).getTime()
  let dateEnd = new Date(year, month + 1).getTime()

  let transactions = await TransactionSchema.find({
    $and : [
      {auth : req.userID},
      {date : { $lte : dateStart}},
      {date : { $gt : dateEnd}}
    ]
  });

  if(!transactions[0]) throw new ResponseException("Aucune transactions trouvé").NotFound()

  /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
  if(req.userID !== transactions[0].auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation pour consulter cette information").Forbidden();

  let Responses = JSON.stringify(transactions.map((b : any) => TransactionNormalizer(b)))
  throw new ResponseException(Responses).Success()  
})

export const CreateTransaction = catchSync(async (req : any) => {
  let { montant, date, commentaire, devise, type, categorieID, liedTransactionsID, walletID } = req.body ?? 0;

  if(walletID && !isValidMongooseId(walletID)) throw new ResponseException("L'id du compte n'est pas valide").BadRequest();
  if(categorieID && !isValidMongooseId(categorieID)) throw new ResponseException("L'id de la catégorie n'est pas valide").BadRequest();
  if(liedTransactionsID && !isValidMongooseId(liedTransactionsID)) throw new ResponseException("L'id de la transaction n'est pas valide").BadRequest();

  let resultWallet = WalletSchema.findById(walletID)
  let resultCategorie = CategorieSchema.findById(categorieID)
  let resultTransaction = TransactionSchema.findById(liedTransactionsID)

  if(date && dateCheck(date)) date = new Date(date).getTime();

  try{
    let transaction = new TransactionSchema({
      liedTransactions : liedTransactionsID,
      categorie : categorieID,
      typeTransaction : type,
      wallet : walletID,
      auth : req.userID,
      commentaire,
      montant,
      devise,
      date,
    })

    let err = transaction.validateSync();
    if(err) throw err;

    let WalletData = await resultWallet;
    let CategorieData = await resultCategorie;
    let TransactionData = await resultTransaction;

    if(categorieID && !CategorieData) throw new ResponseException("La catégorie indiquée n'éxiste pas").NotFound();
    if(liedTransactionsID && !TransactionData) throw new ResponseException("La transaction indiquée n'éxiste pas").NotFound();
    if(walletID && !WalletData) throw new ResponseException("Le compte indiqué n'éxiste pas").NotFound();

    /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
    if(!req.isValidToken || (walletID && WalletData && WalletData.auth  !== req.userID) || (categorieID && CategorieData && CategorieData.auth  !== req.userID) || (liedTransactionsID && TransactionData && TransactionData.auth  !== req.userID)) throw new ResponseException("Vous n'avez pas l'autorisation d'enregistrer cette information").Forbidden();

    await transaction.save()

    let Responses = JSON.stringify(TransactionNormalizer(transaction))
    throw new ResponseException(Responses).OK();
  }catch(e : any){
    if(!e.name || e.name !== "ValidationError") throw e;
      
    if(e.errors.auth){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.auth.message, e.errors.auth.value, "Auth", "id"))
      .BadRequest();
    }

    if(e.errors.liedTransactions){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.liedTransactions.message, e.errors.liedTransactions.value, "Lied transaction ID", "ID"))
      .BadRequest();
    }

    if(e.errors.categorie){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.categorie.message, e.errors.categorie.value, "Categorie ID", "ID"))
      .BadRequest();
    }

    if(e.errors.typeTransaction){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.typeTransaction.message, e.errors.typeTransaction.value, "Type", "number"))
      .BadRequest();
    }

    if(e.errors.wallet){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.wallet.message, e.errors.wallet.value, "Wallet ID", "ID"))
      .BadRequest();
    }

    if(e.errors.commentaire){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.commentaire.message, e.errors.commentaire.value, "Commentaire", "string"))
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

    if(e.errors.date){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.date.message, e.errors.date.value, "Date", "date"))
      .BadRequest();
    }
  }
})

export const UpdateTransaction = catchSync(async (req : any) => {
  let { montant, date, commentaire, devise, categorieID, liedTransactionsID, walletID, id } = req.body ?? 0;

  let transactionBrut = TransactionSchema.findById(id);

  if(walletID && !isValidMongooseId(walletID)) throw new ResponseException("L'id du compte n'est pas valide").BadRequest();
  if(categorieID && !isValidMongooseId(categorieID)) throw new ResponseException("L'id de la catégorie n'est pas valide").BadRequest();
  if(liedTransactionsID && !isValidMongooseId(liedTransactionsID)) throw new ResponseException("L'id de la transaction n'est pas valide").BadRequest();

  let resultWallet = WalletSchema.findById(walletID)
  let resultCategorie = CategorieSchema.findById(categorieID)
  let resultTransaction = TransactionSchema.findById(liedTransactionsID)

  if(date && dateCheck(date)) date = new Date(date).getTime();

  try{
    let transaction = await transactionBrut;
    if(!transaction) throw new ResponseException("L'identifiant est invalide").NotFound();

    if(liedTransactionsID) transaction.liedTransactions = liedTransactionsID;
    if(commentaire) transaction.commentaire = commentaire;
    if(categorieID) transaction.categorie = categorieID;
    if(walletID) transaction.wallet = walletID;
    if(montant) transaction.montant = montant;
    if(devise) transaction.devise = devise;
    if(date) transaction.date = date;
    
    let err = transaction.validateSync();
    if(err) throw err;

    let WalletData = await resultWallet;
    let CategorieData = await resultCategorie;
    let TransactionData = await resultTransaction;

    if(categorieID && !CategorieData) throw new ResponseException("La catégorie indiquée n'éxiste pas").NotFound();
    if(liedTransactionsID && !TransactionData) throw new ResponseException("La transaction indiquée n'éxiste pas").NotFound();
    if(walletID && !WalletData) throw new ResponseException("Le compte indiqué n'éxiste pas").NotFound();

    /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
    if(!req.isValidToken || (walletID && WalletData && WalletData.auth  !== req.userID) || (categorieID && CategorieData && CategorieData.auth  !== req.userID) || (liedTransactionsID && TransactionData && TransactionData.auth  !== req.userID)) throw new ResponseException("Vous n'avez pas l'autorisation d'enregistrer cette information").Forbidden();

    await transaction.save()

    let Responses = JSON.stringify(TransactionNormalizer(transaction))
    throw new ResponseException(Responses).OK();
  }catch(e : any){
    if(!e.name || e.name !== "ValidationError") throw e;
      
    if(e.errors.liedTransactions){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.liedTransactions.message, e.errors.liedTransactions.value, "Lied transaction ID", "ID"))
      .BadRequest();
    }

    if(e.errors.categorie){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.categorie.message, e.errors.categorie.value, "Categorie ID", "ID"))
      .BadRequest();
    }

    if(e.errors.wallet){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.wallet.message, e.errors.wallet.value, "Wallet ID", "ID"))
      .BadRequest();
    }

    if(e.errors.commentaire){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.commentaire.message, e.errors.commentaire.value, "Commentaire", "string"))
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

    if(e.errors.date){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.date.message, e.errors.date.value, "Date", "date"))
      .BadRequest();
    }
  }
})

export const DeleteTransaction = catchSync(async (req : any) => {
  let { id } = req.body;

  let transaction = await TransactionSchema.findById(id);
  if(!transaction) throw new ResponseException("Aucune transaction trouvée").NotFound();

  if(req.userID !== transaction.auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation de modifier cette information");

  await transaction.deleteOne();

  throw new ResponseException("Transaction supprimé").Success()
})

const TransactionNormalizer = (ObjectifData : any) => {
  let { montant, date, typeTransaction, commentaire, devise, categorie, wallet, liedTransactions, _id } = ObjectifData

  return {
    dateDate : new Timepiece("fr", date).longDateTime(),
    liedTransactionsID : liedTransactions,
    categorieID : categorie,
    type : typeTransaction,
    walletID : wallet,
    datetime : date,
    commentaire,
    id : _id,
    montant,
    devise,
  }
}