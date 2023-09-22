import Fastify from 'fastify'
import cors from '@fastify/cors'
import { DBMock } from './db-mock.js'

const fastify = Fastify({logger: true})
await fastify.register(cors, { 
    origin: '*'
  })
const PORT = 3001
const dbMock = new DBMock()

fastify.get('/users', async (request, reply) => {

    const params = request.query
    const allUsers = dbMock.list(params)
    
    reply.send(allUsers)
    //return allUsers
})

fastify.get('/user/:id', function (request, reply) {
    const user = dbMock.get(request.params.id)
    return user
})

fastify.post('/user', function (request, reply) {
    //const { value1, value2, value3} = request.body

    dbMock.create({
        //value1,
        //value2.
        //value3
    })

    return reply.status(201).send()
})

fastify.put('/user/:id', function (request, reply) {
    const userId = request.params.id
    //const { id, value1, value2, value3} = request.body
    
    dbMock.update({
        userId,
    })

    return reply.status(204).send()
})

fastify.delete('/user/:id', function (request, reply) {
    const userId = request.params.id

    dbMock.delete({
        userId
    })

    return reply.status(204).send()
})

fastify.listen({ port: PORT }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})