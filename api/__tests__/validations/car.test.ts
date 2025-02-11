import { carValidations } from "../../src/validations"

describe('car validations', () => {
    const { validatePostCarRequest } = carValidations
    const body = { 
        nome: "Etios",
        marca: "Toyota",
        preco: 49999.99,
        anoFabricacao: 2016
    }
    it('should return success true', () => {
        expect(body).toHaveProperty('nome')
        const validate = validatePostCarRequest(body)
        expect(validate.success).toBe(true)
        expect(validate.data).toBeTruthy()
        expect(typeof validate.data.preco).toBe('number')  
    })

    it('should return success false', () => {
        const new_body = { ...body, preco: 'teste'}
        expect(new_body).toHaveProperty('marca')
        const validate = validatePostCarRequest(new_body)
        expect(validate.success).toBe(false)
    })

    it('should return success false when try float at anoFabricacao', () => {
        const new_body = { ...body, anoFabricacao: 2016.5}
        expect(new_body).toHaveProperty('marca')
        const validate = validatePostCarRequest(new_body)
        expect(validate.success).toBe(false)
    })

})