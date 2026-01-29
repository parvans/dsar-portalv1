"use server"

import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { prisma } from "../../../prisma/seed"
import { redirect } from "next/navigation"

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

export async function logoutAction() {
  const cookieStore = await cookies()

  cookieStore.set("session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  })

  redirect("/auth/login")
}


