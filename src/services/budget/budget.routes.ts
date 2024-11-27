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

const budgetRoute = express.Router();
router.use('/', budgetRoute);

budgetRoute.route('/')
.put(UpdateBudget)
.post(CreateBudget)
.delete(DeleteBudget);

budgetRoute.route("/find/all")
.get(GetAllUserBudget);
budgetRoute.route("/find/id/:id")
.get(GetBudgetById);
budgetRoute.route("/find/date/:year/:month")
.get(GetBudgetByDate);

const TransactionBudgetRoute = express.Router();
router.use('/transaction', TransactionBudgetRoute);

TransactionBudgetRoute.route('/')
.post(CreateTransactionBudget);

export let BudgetRouter = router;