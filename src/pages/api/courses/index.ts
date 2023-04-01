import { Prisma } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@utils/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, description } = req.body

  if (req.method === "POST") {
    try {
      const course = await prisma.course.create({
        data: { name, description }
      })
      return res.status(201).json(course)
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
