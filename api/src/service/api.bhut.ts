import { PromiseHandler } from "../utils/promise.handler"
import service from "./http.service"

type BhutAuthResponse = {
    accessToken: string
    refreshToken: string
    tokenType: string
    expiresIn: number
}

async function getAuthenticationToken(): Promise<{ status: number, result: BhutAuthResponse | string }>{
    const { data, error } = await PromiseHandler.wrapPromise(service.post('/autenticacao/token'))
    if(error){
        
        const { status, response } = error
        const { data: { errors } } = response
        const message = errors.map(( { code, message }: { code: string, message: string }) => message ).join('.')
        return { status, result: message  }
    }

    return { status: data.status!, result: data.result }
}

export {
    BhutAuthResponse,
    getAuthenticationToken
}