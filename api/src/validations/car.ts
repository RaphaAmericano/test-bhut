import { z } from "zod"
import { formatErrorString } from "../utils/zod"
import { ValidationResponse } from "../types/validations"

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
    }).int('Abi de fabriação deve ser um número inteiro')
  }
)

const getCarQueryParamsRequest = z.object({
    ativo: z.preprocess(
        (val) => {
            if(typeof val === 'string' && (val === 'true' || val === 'false') ) {
                return val === 'true'
            }
            return val
        },
        z.boolean({
            invalid_type_error: "ativo deve ser um booleano",
            description: "Dado ativo"
        }).optional(),
    ),
    pagina: z.preprocess(
        (val) => (typeof val === 'string' ? parseInt(val, 10) : val),
        z.number({
            invalid_type_error: "Página deve ser um número no formato de string.",
            description: "Número da paǵina da busca."
        }).optional()
    ),
    tamanhoPagina: z.preprocess(
        (val) => (typeof val === 'string' ? parseInt(val, 10) : val),
        z.number({
            invalid_type_error: "Tamanho da página deve ser um número no formato de string.",
            description: "Número de items retornados por página."
        }).optional()
    )
  }
)

type PostRequest = z.infer<typeof postRequest>
type GetCarQueryParamsRequestType = z.infer<typeof getCarQueryParamsRequest>

function validatePostCarRequest(body:any){
    const result = postRequest.safeParse(body)
    const data = result.data ?? body
    const error = result.success ? null : formatErrorString(result.error)
    return { success: result.success, error: error || null, data }
}

function validateGetCarQueryRequest(query:any): ValidationResponse<any>{
    const result = getCarQueryParamsRequest.safeParse(query)
    const data = result.data ?? query
    const error = result.success ? null : formatErrorString(result.error)
    return { success: result.success, error: error || null, data }
}

export {
    PostRequest,
    GetCarQueryParamsRequestType,
    validatePostCarRequest,
    validateGetCarQueryRequest
}