"use server"

import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { prisma } from "../../../prisma/seed"

export async function loginAction(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error("Invalid credentials")

  const ok = await bcrypt.compare(password, user.password)
  if (!ok) throw new Error("Invalid credentials")

  ;(await cookies()).set(
    "session",
    JSON.stringify({ id: user.id, role: user.role }),
    { httpOnly: true }
  )

  return { role: user.role }
}


