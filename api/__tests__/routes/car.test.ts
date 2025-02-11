import request from 'supertest'
import server from '../../src/server'
describe('GET /car', () => {
    jest.setTimeout(15000)

    it('should return 200', async () => {
        const response = await request(server).get('/api/car')
        const body = JSON.parse(response.text)
        expect(response.status).toBe(200)
        expect(body.result).toBeTruthy()
        expect(typeof body.result.paginacao).toBe('object')
        expect(body.result.itens instanceof Array).toBe(true)
    })
})