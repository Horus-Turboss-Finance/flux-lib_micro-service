import {
  CreateWallet,
  DeleteWallet, 
  UpdateWallet,
  GetWalletById,
  GetAllUserWallet,
} from './wallet.controller';

import { middleware } from "packages";
import express from "express";

let { LogRequest, controleOrigine, isAuth } = middleware;

const router = express.Router();
router.use(controleOrigine);
router.use(LogRequest);
router.use(isAuth);

router.route('/')
.put(UpdateWallet)
.post(CreateWallet)
.delete(DeleteWallet);

router.route("/find/all")
.get(GetAllUserWallet);
router.route("/find/id/:id")
.get(GetWalletById);

export let WalletRouter = router;