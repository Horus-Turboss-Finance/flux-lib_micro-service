import {
  CreateTransactionBudget, 
  GetAllUserBudget, 
  GetBudgetByDate, 
  GetBudgetById, 
  CreateBudget,
  UpdateBudget,
  DeleteBudget, 
} from "./budget.controller";
import { middleware } from "packages";
import express from "express";

let { LogRequest, controleOrigine, isAuth } = middleware;

const router = express.Router();
router.use(controleOrigine);
router.use(LogRequest);
router.use(isAuth);

router.route('/')
.put(UpdateBudget)
.post(CreateBudget)
.delete(DeleteBudget);

router.route("/find/all")
.get(GetAllUserBudget);
router.route("/find/id/:id")
.get(GetBudgetById);
router.route("/find/date/:year/:month")
.get(GetBudgetByDate);

router.route('/transaction')
.post(CreateTransactionBudget);

export let BudgetRouter = router;