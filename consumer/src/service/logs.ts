
import Log, { LogCreateInput } from "../model/logs"

async function createLog(payload:LogCreateInput){
    const logDoc = new Log(payload)
    await logDoc.save()
    return logDoc
}

async function getLog(id:string){
    return await Log.findById(id)
}

export { createLog, getLog } 