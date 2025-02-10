import service from "../service/http.service"
import { PromiseHandler } from "../utils/promise.handler"

async function sendLogNotification(payload: object){
    const promise = service.post('', { ...payload })
    const { data, error } = await PromiseHandler.wrapPromise(promise)
    return { success: data === "",  data, error }
}

export { 
    sendLogNotification
}