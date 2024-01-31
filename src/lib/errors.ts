import { z } from "zod"

const errors = {
  server: "There's an error encountered! Please try again later.",
  unauthorized: "You're not authorized to access this resource!"
}

export function toErrorMap(error: z.ZodError) {
  return error.errors.map(e => ({ field: e.path[0], message: e.message }))
}

export default errors
