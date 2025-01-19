import { model, Schema } from "mongoose";
import { utils } from "packages";

const categorieSchema = new Schema({
  nom : {
    type : String,
    validate : {
      validator : (strings : any) => utils.stringContraint(strings, 2, 51),
      message : "Le nom de la categorie doit être compris entre 3 et 50 caractère."
    },
    required : [true, "Le nom de la categorie est obligatoire"]
  },
  typeCategorie : {
    type : Number,
    validate : {
      validator : (num : any) => utils.intContraint(num, 0, 3),
      message : "Le type de catégorie doit être compris entre 1 et 2."
    },
    required : [true, "Le type de categorie est requis"]
  },
  color : {
    type : String,
    default : "#000000",
    validate : {
      validator : (strings : any) => utils.IsHexColor(strings),
      message : "La couleur doit être sous format hexadécimal (avec le #)"
    },
    required : [true, "La couleur est obligatoire"]
  },
  auth : {
    type : String,
    validate : {
      validator : (string :any) => utils.isValidMongooseId(string),
      message : "Le format de l'identifiant est invalide"
    },
    index : true,
    required : [true, "Connexion nécessaire"],
  }  
},{
  collection : "categorie"
})

export const CategorieSchema = model("categorie", categorieSchema);
export default model("categorie", categorieSchema);