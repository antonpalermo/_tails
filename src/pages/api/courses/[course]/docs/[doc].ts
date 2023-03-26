import prisma from "@utils/prisma"
import { Prisma } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

interface IncomingAPIRequest extends Omit<NextApiRequest, "method" | "query"> {
  method: "GET"
  query: { course: string; doc: string }
  body: { cid: string; title: string; body: any }
}

export default async function handler(
  req: IncomingAPIRequest,
  res: NextApiResponse
) {
  const { course: courseId, doc: docId } = req.query

  switch (req.method) {
    case "GET":
      try {
        const doc = await prisma.doc.findFirst({
          where: { AND: [{ courseId, id: docId }] }
        })

        if (doc === null) {
          return res.status(404).end()
        }

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
