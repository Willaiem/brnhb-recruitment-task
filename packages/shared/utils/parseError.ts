import { ServerErrorSchema } from "../schemas/ServerError.schema"

export const parseError = (err: unknown) => {
  try {
    return ServerErrorSchema.validateSync(err)
  } catch (_err) {
    return { error: "Internal Server Error", message: 'Something went wrong :(' }
  }
}
