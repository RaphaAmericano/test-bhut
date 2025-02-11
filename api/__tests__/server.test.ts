import request from "supertest"
import server from "../src/server"
describe('server.ts tests', () => {
    it('shold return server ping text', async  () => {
        const res = await request(server).get('/')
        expect(res.text).toEqual("Express + TypeScript Server")
    })

})