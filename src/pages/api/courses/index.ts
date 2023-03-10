import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@libs/prisma"
import { Prisma } from "@prisma/client"

interface IncomingAPIRequest extends Omit<NextApiRequest, "method"> {
  method: "POST" | "GET"
}

export default async function handler(
  req: IncomingAPIRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const courses = await prisma.course.findMany()
        return res.status(200).json(courses)
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          console.log("code: ", e.code, "message: ", e.message)
          return res.status(500).end()
        }
      }
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
    default:
      return res.status(405).end()
  }
}
