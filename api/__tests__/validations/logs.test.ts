import { logsValidations } from "../../src/validations"

const { validateGetLogsQueryRequest } = logsValidations

describe('logs.ts', () => {
    const query = {
        ativo:true,
        pagina: '1',
        tamanhoPagina: '10'
    }
    it('should validate success query', () => {
        expect(query).toHaveProperty('ativo')
        const validate = validateGetLogsQueryRequest(query)
        expect(validate).toBeTruthy()
        expect(validate.success).toBe(true)
    })

    it('should validate success query with number types', () => {
        const new_query = {...query, pagina: 1, tamanhoPagina: 20 }
        expect(new_query).toHaveProperty('ativo')
        const validate = validateGetLogsQueryRequest(new_query)
        expect(validate).toBeTruthy()
        expect(validate.success).toBe(true)
    })

    it('should validate success query', () => {
        const new_query = {...query, pagina: 'teste'}
        expect(new_query).toHaveProperty('ativo')
        const validate = validateGetLogsQueryRequest(new_query)
        expect(validate).toBeTruthy()
        expect(validate.success).toBe(false)
    })
})