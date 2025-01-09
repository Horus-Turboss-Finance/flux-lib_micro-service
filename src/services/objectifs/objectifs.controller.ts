import { utils, middleware, ResponseException, Timepiece } from "packages";
import { ObjectifSchema } from "./objectifs.models";
import { WalletSchema } from "../wallet/wallet.model";

let { catchSync } = middleware;
let { mongooseMessageErrorFormator, isValidMongooseId, dateCheck, isValidJSON } = utils;

export const GetObjectifById = catchSync(async (req : any) => {
  let { id } = req.params ?? 0

  if(!isValidMongooseId(id)) throw new ResponseException("Invalid ID objectif").BadRequest()
  let objectif = await ObjectifSchema.findById(id)
  if(!objectif) throw new ResponseException("Aucun objectif trouvé").NotFound()

  /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
  if(req.userID !== objectif.auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation pour consulter cette information").Forbidden();

  let Responses = JSON.stringify(ObjectifNormalizer(objectif))
  throw new ResponseException(Responses).Success();
})

export const GetAllUserObjectif = catchSync(async (req : any) => {
  const objectifs = await ObjectifSchema.find({
    auth : req.userID
  });

  if(!objectifs[0]) throw new ResponseException("Aucun objectif trouvé").NotFound()

  /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
  if(req.userID !== objectifs[0].auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation pour consulter cette information").Forbidden();

  let Responses = JSON.stringify(objectifs.map((b : any) => ObjectifNormalizer(b)))
  throw new ResponseException(Responses).Success()  
})

export const CreateObjectif = catchSync(async (req : any) => {
  let { idParent, devise, montant, start, end, type, wallet, title } = req.body ?? 0;

  if(idParent && !isValidMongooseId(idParent)) throw new ResponseException("L'id de l'objectif n'est pas valide").BadRequest();
  if(wallet && !isValidMongooseId(wallet)) throw new ResponseException("L'id du compte n'est pas valide").BadRequest();

  let resultWallet = WalletSchema.findById(wallet)
  let resultObjectif = ObjectifSchema.findById(idParent)
  
  if(start && dateCheck(start)) start = new Date(start).getTime();
  if(end && dateCheck(end)) end = new Date(end).getTime();

  if(start >= end || !end) throw new ResponseException("La date de fin ne peut être inférieur à la date de début et doit être spécifié").BadRequest();

  try{
    let objectif = new ObjectifSchema({
      identifiantDevise : devise,
      montantDevise : montant,
      typeObjectif : type,
      dateStart : start,
      wallet : [wallet],
      auth : req.userID,
      dateEnd : end,
      idParent,
      title,
    })

    let err = objectif.validateSync();
    if(err) throw err;

    let WalletData = await resultWallet;
    let ObjectifData = await resultObjectif;

    if(!ObjectifData && idParent) throw new ResponseException("L'objectif n'éxiste pas").NotFound();
    if(!WalletData && wallet) throw new ResponseException("Le compte n'éxiste pas").NotFound();


    await objectif.save()

    let Responses = JSON.stringify(ObjectifNormalizer(objectif))
    throw new ResponseException(Responses).OK();
  }catch(e : any){
    if(!e.name || e.name !== "ValidationError") throw e;
      
    if(e.errors.auth){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.auth.message, e.errors.auth.value, "Auth", "id"))
      .BadRequest();
    }

    if(e.errors.idParent){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.idParent.message, e.errors.idParent.value, "ID Parent", "ID"))
      .BadRequest();
    }

    if(e.errors.identifiantDevise){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.identifiantDevise.message, e.errors.identifiantDevise.value, "Devise", "EUR|USD|GBP|CAD"))
      .BadRequest();
    }

    if(e.errors.montantDevise){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.montantDevise.message, e.errors.montantDevise.value, "Montant", "number"))
      .BadRequest();
    }

    if(e.errors.dateStart){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.dateStart.message, e.errors.dateStart.value, "Date de début", "date"))
      .BadRequest();
    }

    if(e.errors.dateEnd){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.dateEnd.message, e.errors.dateEnd.value, "Date de fin", "date"))
      .BadRequest();
    }

    if(e.errors.title){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.title.message, e.errors.title.value, "Title", "string"))
      .BadRequest();
    }

    if(e.errors.typeObjectif){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.typeObjectif.message, e.errors.typeObjectif.value, "Type", "number"))
      .BadRequest();
    }

    if(e.errors.wallet){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.wallet.message, e.errors.wallet.value, "Wallet", "ID of wallet"))
      .BadRequest();
    }
  }
})

export const UpdateObjectif = catchSync(async (req : any) => {
  let { montant, end, finish, title, id } = req.body ?? 0;

  if(!isValidMongooseId(id)) throw new ResponseException("Invalid ID objectif").BadRequest()
  let objectifBrut = ObjectifSchema.findById(id);

  try{
    let objectif = await objectifBrut;
    if(!objectif) throw new ResponseException("L'identifiant est invalide").NotFound();


    if(end) objectif.dateEnd = new Date(end).getTime();
    if(montant) objectif.montantDevise = montant;
    if(title) objectif.title = title;
    if(finish) objectif.finish = finish;
    
    let err = objectif.validateSync();
    if(err) throw err;

    if(req.userID !== objectif.auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation de modifier cette information").Forbidden();

    await objectif.save()

    let Responses = JSON.stringify(ObjectifNormalizer(objectif));
    throw new ResponseException(Responses).Success();
  }catch(e : any){
    if(!e.name || e.name !== "ValidationError") throw e;

    if(e.errors.dateEnd){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.dateEnd.message, e.errors.dateEnd.value, "Date de fin", "Date"))
      .BadRequest();
    }

    if(e.errors.montantDevise){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.montantDevise.message, e.errors.montantDevise.value, "Montant", "number"))
      .BadRequest();
    }

    if(e.errors.title){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.title.message, e.errors.title.value, "Title", "string"))
      .BadRequest();
    }
  }
})

export const UpdateObjectifsWallet = catchSync(async (req : any) => {
  let {id, wallet} = req.body;
  if(!wallet) throw new ResponseException("Il n'y a rien à modifier").BadRequest();
  if(!isValidMongooseId(id)) throw new ResponseException("Invalid ID compte financier").BadRequest()
  let objectifBrut = ObjectifSchema.findById(id);

  if(isValidJSON(wallet) && JSON.parse(wallet)[0]) {
    JSON.parse(wallet).map(async (w : any) => {
      if(!isValidMongooseId(w)) throw new ResponseException("Invalid ID compte financier").BadRequest()
      let agent = await WalletSchema.findById(w)

      if(!agent || req.userID !== agent.auth) throw new ResponseException("Vous n'avez pas l'autorisation de modifier cette information").Forbidden();
    })
  }else{
    if(!isValidMongooseId(wallet)) throw new ResponseException("Invalid ID compte financier").BadRequest()
    let agent = await WalletSchema.findById(wallet)

    if(!agent || req.userID !== agent.auth) throw new ResponseException("Vous n'avez pas l'autorisation de modifier cette information").Forbidden();
  }

  try{
    let objectif = await objectifBrut;
    if(!objectif) throw new ResponseException("L'identifiant est invalide").NotFound();

    if(!wallet[0]) wallet = `[${wallet}]`;
    if(wallet && !isValidJSON(wallet)) throw new ResponseException("L'array wallet est invalide").BadRequest();
    if(wallet) objectif.wallet = JSON.parse(wallet);

    let err = objectif.validateSync();
    if(err) throw err;

    if(req.userID !== objectif.auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation de modifier cette information");

    await objectif.save()

    let Responses = JSON.stringify(ObjectifNormalizer(objectif));
    throw new ResponseException(Responses).Success();
  }catch(e : any){
    if(!e.name || e.name !== "ValidationError") throw e;
      
    if(e.errors.wallet){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.wallet.message, e.errors.wallet.value, "Wallet", "id"))
      .BadRequest();
    }
  }
})

export const DeleteObjectif = catchSync(async (req : any) => {
  let { id } = req.body;

  if(!isValidMongooseId(id)) throw new ResponseException("Invalid ID objectif").BadRequest()
  let objectif = await ObjectifSchema.findById(id);
  if(!objectif) throw new ResponseException("Aucun objectif trouvée").NotFound();

  if(req.userID !== objectif.auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation de modifier cette information").Forbidden();

  await objectif.deleteOne();

  throw new ResponseException("Objectif supprimé").Success()
})

const ObjectifNormalizer = (ObjectifData : any) => {
  let { idParent, identifiantDevise, montantDevise, dateStart, dateEnd, typeObjectif, wallet, title, finish, _id } = ObjectifData

  return {
    startDate : new Timepiece(dateStart).longDateTime(),
    endDate : new Timepiece(dateEnd).longDateTime(),
    devise : identifiantDevise, 
    montant : montantDevise,
    startTime : dateStart,
    type : typeObjectif,
    finished : finish,
    endTime : dateEnd,
    id : _id,
    idParent, 
    wallet, 
    title,
  }
}