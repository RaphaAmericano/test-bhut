import request from 'supertest'
import server from '../../src/server'
describe('GET /logs', () => {
    jest.setTimeout(15000)
    
    it('should return 500', async () => {
        const response = await request(server).get('/api/logs')
        expect(response.status).toBe(500)
        expect(true).toBe(true)
    })
})