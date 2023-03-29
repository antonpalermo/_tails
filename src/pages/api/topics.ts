import { Prisma } from "@prisma/client"
import prisma from "@utils/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req.body

  const allowedMethods = ["POST"]

  if (!allowedMethods.includes(req.method) || req.method === "OPTIONS") {
    return res
      .status(405)
      .json({ message: "Current request methods is not allowed!" })
  }

  if (req.method === "POST") {
    try {
      const topic = await prisma.topic.create({
        data: { title: "Default Title", body }
      })
      return res.status(201).json(topic)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e.code, e.message)
        return res
          .status(500)
          .json({ message: "Unable to store requested data" })
      }
    }
  }
}
