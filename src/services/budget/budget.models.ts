import { model, Schema } from "mongoose";
import { utils } from "packages";

let { noNegativeNumberContraint } = utils

const budgetSchema = new Schema({
  categorie : {
    required : [true, "La catégorie du budget est requis"],
    type: Schema.Types.ObjectId,
    ref : "categorie",
    unique : true,
  },
  montant : {
    type : Number,
    validate : {
      validator : (v : any) => noNegativeNumberContraint(v),
      message : "Le montant du budget ne peut être négatif"
    },
    required : [true, "Le montant du budget est requis"]
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
      },
      to : {
        type: Schema.Types.ObjectId,
        ref: "budget",
      },
      date : {
        index : true,
        type : Number,
        required : [true, "La date du budget est obligatoire"],
        default : Date.now()
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
    required : [true, "Connexion nécessaire"],
  }  
},{
  collection : "budget"
})

export const BudgetSchema = model("budget", budgetSchema);
export default model("budget", budgetSchema);