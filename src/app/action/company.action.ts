"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { prisma } from "../../../prisma/seed"

export async function createCompanyAction(formData: FormData) {
    try {
    const session = JSON.parse((await cookies()).get("session")!.value)
    const name = formData.get("name")
    const address = formData.get("address")
    const email = formData.get("email")
    const phone = formData.get("phone")
    const employeesCount = formData.get("employeesCount")
    const field = formData.get("field")
    const representation = formData.get("representation")

    if (
      !name ||
      !address ||
      !email ||
      !phone ||
      !employeesCount ||
      !field ||
      !representation
    ) {
      throw new Error("Missing required fields")
    }

    await prisma.company.create({
        data: {
        ownerId: session.id,
        name: formData.get("name") as string,
        logoUrl: formData.get("logoUrl") as string | null,
        address: formData.get("address") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        employeesCount: Number(formData.get("employeesCount")),
        field: formData.get("field") as string,
        representation: formData.get("representation") as any,
        status: "pending",
        },
    });

    revalidatePath("/owner")
    } catch (error) {
        console.error("Create company failed:",error);
    }
  
}
