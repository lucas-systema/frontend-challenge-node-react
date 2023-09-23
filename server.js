import Fastify from 'fastify'
import cors from '@fastify/cors'
import { ChallengeApi } from './api.js'
//import { DBMock } from './db-mock.js'
import axios from 'axios'
import 'dotenv/config'

const fastify = Fastify({ logger: true })
await fastify.register(cors, {
    origin: '*'
})
const PORT = 3001
const challengeApi = new ChallengeApi()
//const challengeApi = new DBMock()

fastify.get('/users', async (request, reply) => {

    const params = request.query

    const allUsers = await challengeApi.list(params)

    reply.send(allUsers)
})

fastify.get('/user/:id', function (request, reply) {
    const user = challengeApi.get(request.params.id)
    return user
})

fastify.post('/user', function (request, reply) {
    //const { value1, value2, value3} = request.body

    challengeApi.create({
        //value1,
        //value2.
        //value3
    })

    return reply.status(201).send()
})

fastify.put('/user/:id', function (request, reply) {
    const userId = request.params.id
    //const { id, value1, value2, value3} = request.body

    challengeApi.update({
        userId,
    })

    return reply.status(204).send()
})

fastify.delete('/user/:id', function (request, reply) {
    const userId = request.params.id

    challengeApi.delete({
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