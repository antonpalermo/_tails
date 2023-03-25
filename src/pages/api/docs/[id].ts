import prisma from "@utils/prisma"
import { Prisma } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

interface IncomingAPIRequest extends Omit<NextApiRequest, "method" | "query"> {
  method: "GET"
  query: { id: string }
  body: { cid: string; title: string; body: any }
}

export default async function handler(
  req: IncomingAPIRequest,
  res: NextApiResponse
) {
  console.log(req.query)

  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query

        const doc = await prisma.doc.findUnique({ where: { id } })

        return res.status(200).json(doc)
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          console.log("code: ", e.code, "message: ", e.message)
        }
        return res.status(500).end()
      }
    default:
      return res.status(405).end()
  }
}
