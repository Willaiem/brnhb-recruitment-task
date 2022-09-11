import { InferType, number, object, string } from 'yup';

export const ServerErrorSchema = object({
  error: string().required(),
  message: string().required()
})

export type ServerError = InferType<typeof ServerErrorSchema>
