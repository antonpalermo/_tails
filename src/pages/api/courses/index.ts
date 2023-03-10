import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@libs/prisma"
import { Prisma } from "@prisma/client"

interface IncomingAPIRequest extends Omit<NextApiRequest, "method"> {
  method: "POST"
}

export default async function handler(
  req: IncomingAPIRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const name = req.body.name

      try {
        const course = await prisma.course.create({ data: { name } })
        return res.status(201).json(course)
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          console.log("code: ", e.code, "message: ", e.message)
          return res.status(500).end()
        }
      }
  }
}
