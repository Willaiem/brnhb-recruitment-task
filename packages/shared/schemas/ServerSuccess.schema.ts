import { InferType, object, string } from 'yup';

export const ServerSuccessSchema = object({
  message: string().required()
})

export type ServerSuccess = InferType<typeof ServerSuccessSchema>
