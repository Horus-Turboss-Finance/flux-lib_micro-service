import { 
  CreateObjectif,
  DeleteObjectif,
  UpdateObjectif,
  GetObjectifById,
  GetAllUserObjectif,
  UpdateObjectifsWallet,
} from './objectifs.controller';
import { middleware } from "packages";
import express from "express";

let { LogRequest, controleOrigine, isAuth } = middleware;

const router = express.Router();
router.use(controleOrigine);
router.use(LogRequest);
router.use(isAuth);

const ObjectifRoute = express.Router();
router.use("/", ObjectifRoute);

ObjectifRoute.route('/')
.put(UpdateObjectif)
.post(CreateObjectif)
.delete(DeleteObjectif);
ObjectifRoute.route('/wallet/modify')
.put(UpdateObjectifsWallet);

ObjectifRoute.route("/find/all")
.get(GetAllUserObjectif);
ObjectifRoute.route("/find/id/:id")
.get(GetObjectifById);

export let ObjectifRouter = router;