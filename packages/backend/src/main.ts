import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import { FormFieldsSchema } from "@shared/schemas/FormFields.schema"
import { ServerErrorSchema } from "@shared/schemas/ServerError.schema"

const prisma = new PrismaClient()

export const app = Fastify({ logger: process.env.NODE_ENV !== 'production' })
await app.register(cors, {
  origin: ["http://127.0.0.1:5173", "http://localhost:5173"]
})

const validateError = (err: unknown) => {
  try {
    return ServerErrorSchema.validateSync(err)
  } catch (_err) {
    return { error: "Internal Server Error", message: 'Something went wrong :(' }
  }
}

app.post('/', async (req) => {
  try {
    const { firstName, lastName, email, eventDate } = await FormFieldsSchema.validate(req.body)

    await prisma.users.create({
      data: {
        name: firstName,
        surname: lastName,
        email,
        eventdate: new Date(eventDate)
      }
    })

    await prisma.$disconnect()
    return { message: 'User added successfully' }
  } catch (err) {
    await prisma.$disconnect()

    throw validateError(err)
  }
})

const start = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT) || 3000 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
