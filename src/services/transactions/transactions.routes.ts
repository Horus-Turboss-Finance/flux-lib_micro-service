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

router.route('/')
.put(UpdateTransaction)
.post(CreateTransaction)
.delete(DeleteTransaction);

router.route("/find/all")
.get(GetAllUserTransaction);
router.route("/find/id/:id")
.get(GetTransactionById);
router.route("/find/date/:year/:month")
.get(GetTransactionByDate);

export let TransactionRouter = router;