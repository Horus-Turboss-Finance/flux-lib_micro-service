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

    app.listen(port, env.IP_FINANCIAL)

    const interfaces : NodeJS.Dict<NetworkInterfaceInfo[]> = os.networkInterfaces();
    for (const k in interfaces) {
      for (const k2 in interfaces[k]) {
        /* @ts-ignore */
        const address = interfaces[k][k2];
  
        if (address.family === 'IPv4') {
          /* Log in file and terminal */
          logSys.ServiceInfo(inAppServiceName.app, `${address.address}:${port}`);

          console.log(`Connect Url : ${address.address}:${port}`)

          /*
            CALL ADRESS MANAGER 
          */
          SignalAdressManager({adressIP : address.address, port, service : serviceName.object.utilisateur}, env)
        }
      }
    }
  }catch(e : any){
    logSys.UnknowAppError(inAppServiceName.index, e)
  }
}

main()