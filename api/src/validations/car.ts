import { z } from "zod"
import { formatErrorString } from "../utils/zod"

const postRequest = z.object({
    nome: z.string({
        required_error: "Nome é obrigatório",
        invalid_type_error: "Nome deve ser uma string",
        description: "Nome do carro"
    }),
    marca: z.string({
        required_error: "Marca é obrigatório",
        invalid_type_error: "Marca deve ser uma string",
        description: "Marca do carro"
    }),
    preco: z.number({
        required_error: "Preço é obrigatório",
        invalid_type_error: "Preço deve ser um número",
        description: "Preço do carro"
    }),
    anoFabricacao: z.number({
        required_error: "Ano de fabricação é obrigatório",
        invalid_type_error: "Ano de fabricação deve ser um número",
        description: "Ano de fabricação do carro"
    })
  }
)

type PostRequest = z.infer<typeof postRequest>

function validatePostCarRequest(body:any){
    const result = postRequest.safeParse(body)
    const data = result.data ?? body
    const error = result.success ? null : formatErrorString(result.error)
    return { success: result.success, error: error || null, data }
}

export {
    PostRequest,
    validatePostCarRequest
}