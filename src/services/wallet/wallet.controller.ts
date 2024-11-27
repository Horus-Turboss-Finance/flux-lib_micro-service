import { utils, middleware, ResponseException } from "packages";
import { WalletSchema } from "./wallet.model";

let { catchSync } = middleware;
let { mongooseMessageErrorFormator, isValidMongooseId, intCheck } = utils;

export const GetWalletById = catchSync(async (req : any) => {
  let { id } = req.params ?? 0

  let wallet = await WalletSchema.findById(id)
  if(!wallet) throw new ResponseException("Aucun compte financier trouvé").NotFound()

  /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
  if(req.userID !== wallet.auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation pour consulter cette information").Forbidden();

  let Responses = JSON.stringify(WalletNormalizer(wallet))
  throw new ResponseException(Responses).Success();
})

export const GetAllUserWallet = catchSync(async (req : any) => {
  let wallets = await WalletSchema.find({
    auth : req.userID
  });

  if(!wallets[0]) throw new ResponseException("Aucun compte financier trouvé").NotFound()

  /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
  if(req.userID !== wallets[0].auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation pour consulter cette information").Forbidden();

  let Responses = JSON.stringify(wallets.map((b : any) => WalletNormalizer(b)))
  throw new ResponseException(Responses).Success()  
})

// IM HERE DONC TOUCH TODO
export const CreateWallet = catchSync(async (req : any) => {
  let { tag, devise, montant, type } = req.body ?? 0;

  try{
    let wallet = new WalletSchema({
      auth : req.userID,
      typeWallet : type,
      devises : [
        {
          montant,
          identifiant : devise
        }
      ],
      tag,
    })

    let err = wallet.validateSync();
    if(err) throw err;

    /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
    if(!req.isValidToken || wallet.auth  !== req.userID) throw new ResponseException("Vous n'avez pas l'autorisation d'enregistrer cette information").Forbidden();

    await wallet.save()

    let Responses = JSON.stringify(WalletNormalizer(wallet))
    throw new ResponseException(Responses).OK();
  }catch(e : any){
    if(!e.name || e.name !== "ValidationError") throw e;
      
    if(e.errors.auth){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.auth.message, e.errors.auth.value, "Auth", "id"))
      .BadRequest();
    }

    if(e.errors.devises){
      /* A CORRIGER DANS LES TESTS */
      console.log(e.errors.devises)
      throw e     
    }

    if(e.errors.typeWallet){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.typeWallet.message, e.errors.typeWallet.value, "Type de compte financier", "ID"))
      .BadRequest();
    }

    if(e.errors.tag){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.tag.message, e.errors.tag.value, "Tag", "number"))
      .BadRequest();
    }
  }
})

export const UpdateWallet = catchSync(async (req : any) => {
  let { devise, montant, tag, id } = req.body ?? 0;

  let walletBrut = WalletSchema.findById(id);
  try{
    let wallet : any = await walletBrut;
    if(!wallet) throw new ResponseException("L'identifiant est invalide").NotFound();

    if((!devise || !montant) && !tag) throw new ResponseException("Aucunes information à modifier").BadRequest();
    if(devise || !montant) throw new ResponseException("Le montant est nécessaire").BadRequest();
    else {
      if(!wallet.devises[0]) wallet.devises.push({
        identifiant : devise,
        montant
      })
      else {
        let index = wallet.devises.findIndex((e : any) => e.identifiant === devise)
        if(index == -1) wallet.devises.push({
          identifiant : devise,
          montant
        })
        else wallet.devises[index] = {
          identifiant : devise,
          montant
        };
      }
    }

    if(tag) wallet.tag = tag;
    
    let err = wallet.validateSync();
    if(err) throw err;

    /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
    if(!req.isValidToken || wallet.auth  !== req.userID) throw new ResponseException("Vous n'avez pas l'autorisation d'enregistrer cette information").Forbidden();

    await wallet.save()

    let Responses = JSON.stringify(WalletNormalizer(wallet))
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

export const DeleteWallet = catchSync(async (req : any) => {
  let { id } = req.body;

  let wallet = await WalletSchema.findById(id);
  if(!wallet) throw new ResponseException("Aucun compte financier trouvée").NotFound();

  if(req.userID !== wallet.auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation de modifier cette information");

  await wallet.deleteOne();

  throw new ResponseException("Compte financier supprimé").Success()
})

const WalletNormalizer = (ObjectifData : any) => {
  let { typeWallet, devises, tag, _id } = ObjectifData

  return {
    type : typeWallet,
    id : _id,
    devises,
    tag
  }
}