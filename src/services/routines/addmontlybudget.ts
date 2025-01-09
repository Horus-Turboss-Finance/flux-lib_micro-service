import { utils, ResponseException } from "packages";
import budgetModels from "../budget/budget.models";

let { isValidMongooseId } = utils;

/* POUR EVITER DENVOYER DEUX REQUÊTE DANS UN MOIS */
let isAlreadyUsed = false;

export const addMonthBudget = async () => {
  if(new Date().getDate() != 1 && !isAlreadyUsed) {
    isAlreadyUsed = false;
    return setTimeout(addMonthBudget, 24*60*60*1000);
  }

  let cursor = budgetModels.find().cursor()

  for(let doc : any = await cursor.next(); doc != null; doc = await cursor.next()){
    let {montant} = doc;

    if(!doc.history[0]) doc.history = []
    doc.history.push({
      montant,
    })
  }

  isAlreadyUsed = true;
  return setTimeout(addMonthBudget, 24*60*60*1000)
}

addMonthBudget()