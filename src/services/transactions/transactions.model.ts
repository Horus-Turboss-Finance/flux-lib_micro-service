import { model, Schema } from "mongoose";
import { utils } from "packages";

const transactionSchema = new Schema({
  montant : {
    type: Number,
    validate : {
      validator : (number : any) => utils.noNegativeNumberContraint(number),
      message: "Le montant ne peut être négatif"
    },
    required : [true, "Le montant est obligatoire"]
  },
  date : {
    type: Number,
    index : true,
    required : [true, "La date est nécessaire"],
    default : Date.now(),
  },
  typeTransaction : {
    type : Number,
    required : [true, "Le type de transaction est nécessaire"],
    validate : {
      validator : (number : any) => utils.intContraint(number, 0, 5),
      message : 'Le type ne peux être inférieur à 1 et supérieur à 4'
    }
  },
  commentaire : {
    type : String,
    validate : {
      validator : (string : any) => {
        return utils.stringContraint(string, 0, 251);
      },
      message : "Le commentaire ne peut faire plus de 250 caractères."
    }
  },
  devise : {
    type : String,
    enum : {
      values: ["EUR", "USD", "GBP", "CAD"],
      message: 'Votre devise n\'est pas disponible dans les saisies'
    },
    required : [true, "La devise est obligatoire"]
  },
  categorie : {
    type : Schema.Types.ObjectId,
    ref: "categorie",
    index : true
  },
  wallet : {
    type : Schema.Types.ObjectId,
    ref : 'wallet',
    index : true
  },
  liedTransactions : {
    type : Schema.Types.ObjectId,
    ref : "transaction"
  },
  auth : {
    type : String,
    required : [true, "Connexion nécessaire"],
    validate : {
      validator : (string :any) => utils.isValidMongooseId(string),
      message : "Le format de l'identifiant est invalide"
    },
    index : true
  },
},{
  collection : "transaction"
})

transactionSchema.pre("save", async (next) => {
  // update wallet
  next()
})

export const TransactionSchema = model("transaction", transactionSchema)
export default model("transaction", transactionSchema)