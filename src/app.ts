import { TransactionRouter } from "./services/transactions/transactions.routes";
import { CategorieRouter } from "./services/category/categorie.routes";
import { ObjectifRouter } from "./services/objectifs/objectifs.routes";
import { ResponseException, log, middleware, params } from "packages";
import { BudgetRouter } from "./services/budget/budget.routes";
import { WalletRouter } from "./services/wallet/wallet.routes";
import { connectDatabase } from "./config/db";
import express from "express";
import path from "path";

/* ROUTING */
import './services/routines/addmontlybudget'

const app = express();

let { catchSync, ResponseProtocole } = middleware;
let { serviceName, inAppServiceName, loadEnv, env } = params;

/*
    CONFIGURATION
*/
env = loadEnv(path.resolve(__dirname, "../../.env"));

app.set("envLoad", env);
app.set("logSys", new log(serviceName.object.flux, path.resolve("src", "log")));

app.disable("x-powered-by");
app.enable("json escalpe");

/*
    CONNECT DB
*/
connectDatabase(app);

/*
    MIDDLEWARE
*/
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

/*
    API FINANCE SERVICE
*/
app.use("/budget", BudgetRouter);
app.use("/wallet", WalletRouter);
app.use("/objectif", ObjectifRouter);
app.use("/categorie", CategorieRouter);
app.use("/transaction", TransactionRouter);
app.get('/ping', catchSync(async()=> {
    throw new ResponseException("Service en ligne").Success()
}));

/*
    ERROR 404
*/
app.use('*', catchSync(async() => {
    throw new ResponseException("Chemin ou méthodes non supporté.").NotFound()
}));

/*
    ERROR HANDLER
*/
app.use(ResponseProtocole);

/*
    CRITIC LOGS
*/
process.on("uncaughtException", (e) => {
    console.log(e)
    let logSys = app.get("logSys")

    if(!logSys) throw new Error("LogSys error : LogSys n'est pas monté");

    logSys.UnknowAppError(inAppServiceName.index, e)
});

export default app;