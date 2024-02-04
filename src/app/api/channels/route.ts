import { z } from "zod"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import prisma from "@/lib/prisma"
import errors, { toErrorMap } from "@/lib/errors"
import options from "../auth/[...nextauth]/options"
import { Prisma } from "@prisma/client"

const schema = z.object({
  name: z
    .string()
    .refine(data => data.trim() !== "", { message: "Name is required" })
    .refine(data => data.length >= 3 || data.trim() === "", {
      message: "Name must be at least 3 characters long"
    }),
  description: z.string()
})

export async function POST(req: Request) {
  const session = await getServerSession(options)

  if (!session) {
    return new NextResponse(errors.unauthorized, { status: 401 })
  }

  const user = session.user
  const validatedSchema = schema.safeParse(await req.json())

  if (!validatedSchema.success) {
    return NextResponse.json(
      { errors: toErrorMap(validatedSchema.error) },
      { status: 400 }
    )
  }

  try {
    const channel = await prisma.channel.create({
      data: {
        name: validatedSchema.data.name,
        description: validatedSchema.data.description,
        members: {
          create: {
            name: user?.name!,
            email: user?.email!,
            image: user?.image!,
            role: "admin"
          }
        }
      }
    })

    return NextResponse.json(channel, { status: 201 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // check if the error is related unique constrains
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            errors: [
              {
                field: "name",
                message: `${validatedSchema.data.name} is already taken.`
              }
            ]
          },
          { status: 400 }
        )
      }
    }
    return new NextResponse(errors.server, { status: 500 })
  }
}
