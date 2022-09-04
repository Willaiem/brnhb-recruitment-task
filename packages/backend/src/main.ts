import Fastify from 'fastify'

const fastify = Fastify({ logger: process.env.NODE_ENV !== 'production' })

const start = async () => {
  try {
    await fastify.listen({ port: Number(process.env.PORT) || 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
