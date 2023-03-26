import prisma from "@utils/prisma"
import { Prisma } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

interface IncomingAPIRequest extends Omit<NextApiRequest, "method" | "query"> {
  method: "POST" | "GET"
  query: { id: string }
  body: { cid: string; title: string; body: any }
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
    case "POST":
      const cid = req.query.id
      const { title, body } = req.body
      try {
        const doc = await prisma.doc.create({
          data: { title, body, course: { connect: { id: cid } } }
        })
        return res.status(201).json(doc)
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
