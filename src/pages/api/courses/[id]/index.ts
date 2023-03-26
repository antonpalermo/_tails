import prisma from "@utils/prisma"
import { Prisma } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

interface IncomingAPIRequest extends Omit<NextApiRequest, "method" | "query"> {
  method: "GET"
  query: { id: string }
}

export default async function handler(
  req: IncomingAPIRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  switch (req.method) {
    case "GET":
      try {
        const course = await prisma.course.findUniqueOrThrow({
          where: { id },
          include: { docs: { select: { id: true, title: true } } }
        })
        return res.status(200).json(course)
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          return res.status(404).json({ message: `${id} not found` })
        }
      }

    default:
      return res.status(405).end()
  }
}
