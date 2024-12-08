import { model, Schema } from "mongoose";
import { utils } from "packages";

const walletSchema = new Schema({
  tag : {
    type: String,
    validate :{
      validator : (str : any) => utils.stringContraint(str, 0, 51),
      message : "Un tag ne peut faire plus de 50 caractère."
    }
  },
  devises : [
    {
      identifiant : {
        type : String,
        required : [true, "Le type de devise est nécessaire."],
        enum : {
          values: ["EUR", "USD", "GBP", "CAD"],
          message: 'Votre devise n\'est pas disponible dans les saisies'
        }
      },
      montant : {
        type : Number,
        required : [true, 'Le montant de la devise est obligatoire'],
        default : 0
      }
    }
  ],
  typeWallet : {
    type : Number,
    required : [true, "Le type de compte est requis."],
    validate : {
      validator : (number : any) => {
        return utils.intContraint(number, 0, 10)
      } ,
      message : "Le type de compte doit être compris entre 1 et 9"
    }
  },
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
  collection : "wallet"
})

export const WalletSchema = model("wallet", walletSchema)
export default model("wallet", walletSchema)