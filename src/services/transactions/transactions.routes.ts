import {
  GetAllUserTransaction,
  GetTransactionByDate,
  GetTransactionById,
  UpdateTransaction,
  CreateTransaction,
  DeleteTransaction,
} from './transactions.controller';

import { middleware } from "packages";
import express from "express";

let { LogRequest, controleOrigine, isAuth } = middleware;

const router = express.Router();
router.use(controleOrigine);
router.use(LogRequest);
router.use(isAuth);

const TransactionRoute = express.Router();
router.use('/', TransactionRoute);

TransactionRoute.route('/')
.put(CreateTransaction)
.post(UpdateTransaction)
.delete(DeleteTransaction);

TransactionRoute.route("/find/all")
.get(GetAllUserTransaction);
TransactionRoute.route("/find/id/:id")
.get(GetTransactionById);
TransactionRoute.route("/find/date/:year/:month")
.get(GetTransactionByDate);

export let TransactionRouter = router;