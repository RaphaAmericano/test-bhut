import Log from "../model/logs"
async function getLogs(){
    return await Log.find() 
}

export { getLogs }