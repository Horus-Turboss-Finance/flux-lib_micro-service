import app from './app';
import { params, utils, servicesConnexion } from "packages"
import os, { NetworkInterfaceInfo } from "os";

const { SignalAdressManager } = servicesConnexion;
const { inAppServiceName, serviceName } = params;
const { FreePort } = utils;

/*

  CONNECT API

*/
const main = async () => {
  /* Le système de log défini dans `app.ts` -> à voir dans le dossier ../package ou son ripo git */
  let logSys = app.get("logSys")
  let env = app.get("envLoad")

  if(!logSys) throw new Error("LogSys error : LogSys n'est pas monté dans le fichier `app.ts` sous le format `logSys`");
  if(!env) throw new Error("Env error : Env n'est pas monté dans le fichier `app.ts` sous le format `envLoad`")

  try{
    const port = await FreePort()

    app.listen(port, env.IP_FINANCIAL, ()=> {
      console.log("flux service listening on port : " + port)
    })

    /*
      CALL ADRESS MANAGER 
    */
    SignalAdressManager({adressIP : env.MACHINE_IP, port, service : serviceName.object.flux}, env)
  }catch(e : any){
    logSys.UnknowAppError(inAppServiceName.index, e)
  }
}

main()