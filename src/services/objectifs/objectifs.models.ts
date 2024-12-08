import { model, Schema } from "mongoose";
import { utils } from "packages";

const objectifSchema = new Schema({
  idParent : {
    type: Schema.Types.ObjectId,
    ref : "objectif"
  },
  identifiantDevise : {
    type : String,
    required : [true, "Le type de devise est nécessaire."],
    enum : {
      values: ["EUR", "USD", "GBP", "CAD"],
      message: 'Votre devise n\'est pas disponible dans les saisies'
    }
  },
  montantDevise : {
    type : Number,
    required : [true, 'Le montant de la devise est obligatoire'],
    default : 0
  },
  dateStart : {
    type: Number,
    required : [true, "La date de début de l'objectif est nécessaire"],
    default : Date.now(),
  },
  finish : {
    type : Boolean,
    default : false
  },
  dateEnd : {
    type: Number,
    required : [true, "La date de début de l'objectif est nécessaire"],
    validate : {
      validator : (dat: any) => utils.noPastDateContraint(dat),
      message : "La date de fin ne peut être passé" 
    },
    default : Date.now() + 1000000000,
  },
  title : {
    type : String,
    validate : {
      validator : (strings : any) => utils.stringContraint(strings, 0, 51),
      message : "Le titre ne peut dépasser 50 caractère"
    }
  },
  typeObjectif : {
    type : Number,
    required : [true, "Le type de compte est requis."],
    validate : {
      validator : (number : any) => utils.intContraint(number, 0, 10),
      message : "Le type de compte doit être compris entre 1 et 9"
    }
  },
  wallet : [
    {
      type : Schema.Types.ObjectId,
      ref : 'wallet',
      index : true
    }
  ],
  auth : {
    type : String,
    required : [true, "Connexion nécessaire"],
    validate : {
      validator : (string :any) => {
        return utils.isValidMongooseId(string)
      },
      message : "Le format de l'identifiant est invalide"
    },
    index : true
  }  
},{
  collection : "objectif"
})

export const ObjectifSchema = model("objectif", objectifSchema)
export default model("objectif", objectifSchema)