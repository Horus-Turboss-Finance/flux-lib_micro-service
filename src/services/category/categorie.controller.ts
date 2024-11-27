import { utils, middleware, ResponseException } from "packages";
import { CategorieSchema } from "./categorie.models";

let { catchSync } = middleware;
let { isValidMongooseId, mongooseMessageErrorFormator } = utils;

export const GetCategoryById = catchSync(async (req : any) => {
  let { id } = req.params ?? 0

  if(!isValidMongooseId(id)) throw new ResponseException("Invalide id").BadRequest();

  let categorie = await CategorieSchema.findById(id)

  if(!categorie) throw new ResponseException("Aucune catégorie trouvée").NotFound()

  /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
  if(req.userID !== categorie.auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation pour consulter cette information").Forbidden();

  let Responses = JSON.stringify(CategorieNormalizer(categorie))
  throw new ResponseException(Responses).Success();
})

export const GetAllUserCategory = catchSync(async (req : any) => {
  const categories = await CategorieSchema.find({
    auth : req.userID
  });

  if(!categories[0]) throw new ResponseException("Aucunes catégories trouvées").NotFound()

  /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
  if(req.userID !== categories[0].auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation pour consulter cette information").Forbidden();

  let Responses = JSON.stringify(categories.map((b : any) => CategorieNormalizer(b)))
  throw new ResponseException(Responses).Success()  
})

export const CreateCategory = catchSync(async (req : any) => {
  let { nom, color, type } = req.body ?? 0;

  /* req.userID & req.isValidToken sont des propriété enregistrée dans le middleware auth via un call async */
  if(!req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation d'enregistrer cette information").Forbidden();

  try{
    let categorie = new CategorieSchema({
      typeCategorie : type,
      auth : req.userID,
      color,
      nom,
    })

    let err = categorie.validateSync();
    if(err) throw err;

    await categorie.save()

    let Responses = JSON.stringify(CategorieNormalizer(categorie))
    throw new ResponseException(Responses).OK();
  }catch(e : any){
    if(!e.name || e.name !== "ValidationError") throw e;
      
    if(e.errors.auth){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.auth.message, e.errors.auth.value, "Auth", "id"))
      .BadRequest();
    }

    if(e.errors.nom){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.nom.message, e.errors.nom.value, "Nom", "string"))
      .BadRequest();
    }

    if(e.errors.typeCategorie){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.typeCategorie.message, e.errors.typeCategorie.value, "Type", "number"))
      .BadRequest();
    }

    if(e.errors.color){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.color.message, e.errors.color.value, "Color", "Hexadecimal color"))
      .BadRequest();
    }
  }
})

export const UpdateCategory = catchSync(async (req : any) => {
  let { nom, color, id } = req.body ?? 0;

  let categorie = await CategorieSchema.findById(id);
  if(!categorie) throw new ResponseException("L'identifiant est invalide").NotFound();

  if(req.userID !== categorie.auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation de modifier cette information");

  try{
    if(nom) categorie.nom = nom;
    if(color) categorie.color = color;
    
    let err = categorie.validateSync();
    if(err) throw err;

    await categorie.save()

    let Responses = JSON.stringify(CategorieNormalizer(categorie));
    throw new ResponseException(Responses).Success();
  }catch(e : any){
    if(!e.name || e.name !== "ValidationError") throw e;
      
    if(e.errors.auth){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.auth.message, e.errors.auth.value, "Auth", "id"))
      .BadRequest();
    }

    if(e.errors.nom){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.nom.message, e.errors.nom.value, "Nom", "string"))
      .BadRequest();
    }

    if(e.errors.color){
      throw new ResponseException(mongooseMessageErrorFormator(e.errors.color.message, e.errors.color.value, "Color", "Hexadecimal color"))
      .BadRequest();
    }
  }
})

export const DeleteCategory = catchSync(async (req : any) => {
  let { id } = req.body;

  let categorie = await CategorieSchema.findById(id)
  if(!categorie) throw new ResponseException("Aucune catégorie trouvée").NotFound();

  if(req.userID !== categorie.auth || !req.isValidToken) throw new ResponseException("Vous n'avez pas l'autorisation de modifier cette information");

  await categorie.deleteOne();

  throw new ResponseException("Catégorie supprimé").Success()
})

const CategorieNormalizer = (categorieData : any) => {
  let { nom, typeCategorie, color, _id } = categorieData

  return {
    nom,
    color,
    id : _id,
    typeCategorie,
  }
}