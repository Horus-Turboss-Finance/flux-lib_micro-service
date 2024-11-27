import { 
  CreateCategory,
  DeleteCategory, 
  UpdateCategory,
  GetCategoryById, 
  GetAllUserCategory, 
} from './categorie.controller';
import { middleware } from "packages";
import express from "express";

let { LogRequest, controleOrigine, isAuth } = middleware;

const router = express.Router();
router.use(controleOrigine);
router.use(LogRequest);
router.use(isAuth);

const CategorieRoute = express.Router();
router.use("/", CategorieRoute);

CategorieRoute.route('/')
.put(UpdateCategory)
.post(CreateCategory)
.delete(DeleteCategory);

CategorieRoute.route("/find/all")
.get(GetAllUserCategory);
CategorieRoute.route("/find/id/:id")
.get(GetCategoryById);

export let CategorieRouter = router;