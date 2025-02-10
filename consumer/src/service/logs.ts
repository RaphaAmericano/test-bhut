
import Log, { LogCreateInput } from "../model/logs"

async function createLog(payload:LogCreateInput){
    const logDoc = new Log(payload)
    await logDoc.save()
    return logDoc
}

export { createLog } 