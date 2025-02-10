import { z } from "zod"
import { formatErrorString } from "../utils/zod"

const getLogsQueryParamsRequest = z.object({
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

type GetLogsQueryParamsRequestType = z.infer<typeof getLogsQueryParamsRequest>

function validateGetLogsQueryRequest(query:any){
    const result = getLogsQueryParamsRequest.safeParse(query)
    const data = result.data ?? query
    const error = result.success ? null : formatErrorString(result.error)
    return { success: result.success, error: error || null, data }
}

export {
    GetLogsQueryParamsRequestType,
    validateGetLogsQueryRequest
}