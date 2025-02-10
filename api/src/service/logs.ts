import Log from "../model/logs"
import { GetLogsQueryParamsRequestType } from "../validations/logs"
async function getLogs(query_params:GetLogsQueryParamsRequestType){
    const {  pagina, tamanhoPagina } = query_params 
    // const query = ativo !== undefined ? { ativo } : {}
    const page = pagina ?? 1
    const size = tamanhoPagina ?? 10
    return await Log.find().skip((page -1) * size).limit(size)
}

export { getLogs }