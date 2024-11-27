import { model, Schema } from "mongoose";
import { utils } from "packages";

let { noNegativeNumberContraint } = utils

const budgetSchema = new Schema({
  categorie : {
    type: Schema.Types.ObjectId,
    ref : "categorie",
    required : [true, "La catégorie du budget est requis"]
  },
  montant : {
    type : Number,
    validate : {
      validator : (v : any) => noNegativeNumberContraint(v),
      message : "Le montant du budget ne peut être négatif"
    },
    required : [true, "Le montant du budget est requis"]
  },
  date : {
    index : true,
    type : Number,
    required : [true, "La date du budget est obligatoire"],
    default : Date.now()
  },
  devise : {
    type : String,
    enum : {
      values: ["EUR", "USD", "GBP", "CAD"],
      message: 'Votre devise n\'est pas disponible dans les saisies'
    },
    required : [true, "La devise du budget est requis"]
  },
  history : [
    {
      montant : {
        type : Number,
        required : [true, "Le montant de la transaction est requis"]
      },
      from : {
        type: Schema.Types.ObjectId,
        ref: "budget",
        required : [true, "Le budget d'envoie est requis"]
      },
      to : {
        type: Schema.Types.ObjectId,
        ref: "budget",
        required : [true, "Le budget de reception est requis"]
      }
    }
  ],
  auth : {
    type : String,
    validate : {
      validator : (string :any) => utils.isValidMongooseId(string),
      message : "Le format de l'identifiant est invalide"
    },
    index : true,
    required : [true, "L'identifiant utilisateur est necessaire"],
  }  
},{
  collection : "budget"
})

export const BudgetSchema = model("budget", budgetSchema);
export default model("budget", budgetSchema);