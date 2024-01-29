import { z } from "zod"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import prisma from "@/lib/prisma"
import errors from "@/lib/errors"
import options from "../auth/[...nextauth]/options"
import { Prisma } from "@prisma/client"

const schema = z.object({
  name: z.string(),
  description: z.string()
})

export async function POST(req: Request) {
  const session = await getServerSession(options)

  if (!session) {
    return new NextResponse(errors.unauthorized, { status: 401 })
  }

  const user = session.user
  const cleanSchema = schema.safeParse(await req.json())

  if (!cleanSchema.success) {
    return NextResponse.json(
      { errors: cleanSchema.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  try {
    const channel = await prisma.channel.create({
      data: { ...cleanSchema.data }
    })

    return NextResponse.json(channel, { status: 201 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // check if the error is related unique constrains
      if (error.code === "P2002") {
        return NextResponse.json(
          { errors: `${cleanSchema.data.name} is already taken.` },
          { status: 405 }
        )
      }
    }
    return new NextResponse(errors.server, { status: 500 })
  }
}
