import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@utils/prisma"
import { Prisma } from "@prisma/client"
import parseBoolean from "@utils/parseBoolean"

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
        const published = parseBoolean(req.query.published as string)

        // only get courses that are published
        const courses = await prisma.course.findMany({ where: { published } })

        return res.status(200).json(courses)
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          console.log("code: ", e.code, "message: ", e.message)
        }
        return res.status(500).end()
      }
    case "POST":
      try {
        const { name } = req.body

        const course = await prisma.course.create({ data: { name } })

        return res.status(201).json(course)
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          console.log("code: ", e.code, "message: ", e.message)
        }
        return res.status(500).end()
      }
      break
    default:
      return res.status(405).end()
  }
}
