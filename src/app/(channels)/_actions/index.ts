"use server"

import { z } from "zod"
import { getServerSession } from "next-auth"

import prisma from "@/lib/prisma"
import errors from "@/lib/errors"
import options from "@/app/api/auth/[...nextauth]/options"
import { Prisma } from "@prisma/client"

const schema = z.object({
  name: z.string(),
  description: z.string()
})

export async function createChannel(formData: FormData) {
  const session = await getServerSession(options)

  if (!session) {
    return new Error(errors.unauthorized)
  }

  const channel = schema.safeParse({
    name: formData.get("name"),
    description: formData.get("description")
  })

  if (!channel.success) {
    return {
      errors: channel.error.flatten().fieldErrors
    }
  }

  try {
    await prisma.channel.create({
      data: { name: channel.data.name, description: channel.data.description }
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return { errors: `${channel.data.name} is already taken.` }
      }
    }

    return new Error(errors.server)
  }
}
