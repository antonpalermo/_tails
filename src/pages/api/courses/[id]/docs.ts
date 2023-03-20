import prisma from "@libs/prisma"
import { Prisma } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

interface IncomingAPIRequest extends Omit<NextApiRequest, "method" | "query"> {
  method: "POST" | "GET"
  query: { id: string }
}

export default async function handler(
  req: IncomingAPIRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const id = req.query.id
      try {
        const docs = await prisma.doc.findMany({
          where: { courseId: { equals: id } },
          select: { id: true, title: true }
        })
        return res.status(200).json(docs)
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
