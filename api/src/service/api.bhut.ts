import { PromiseHandler } from "../utils/promise.handler"
import service from "./http.service"

type BhutAuthResponse = {
    accessToken: string
    refreshToken: string
    tokenType: string
    expiresIn: number
}

async function getAuthenticationToken(): Promise<{ status: number, result: BhutAuthResponse | string }>{
    const promise_request = service.post('/autenticacao/token', {
        login: process.env.API_BHUT_USERNAME,
        senha: process.env.API_BHUT_PASSWORD
    })
    const { data, error } = await PromiseHandler.wrapPromise(promise_request)
    if(error){    
        const { status, response } = error
        const { data: { errors } } = response
        const message = errors.map(( { code, message }: { code: string, message: string }) => message ).join('.')
        return { status, result: message  }
    }
    
    return { status: 200, result:{ ...data } }
}

export {
    BhutAuthResponse,
    getAuthenticationToken
}