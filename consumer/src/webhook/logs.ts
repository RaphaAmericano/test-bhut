import service from "../service/http.service"

async function sendLogNotification(payload: object){
    const promise = await service.post('', { payload })
    

}

export { 
    sendLogNotification
}