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

const WalletRoute = express.Router();
router.use('/', WalletRoute);

WalletRoute.route('/')
.put(UpdateWallet)
.post(CreateWallet)
.delete(DeleteWallet);

WalletRoute.route("/find/all")
.get(GetAllUserWallet);
WalletRoute.route("/find/id/:id")
.get(GetWalletById);

export let WalletRouter = router;