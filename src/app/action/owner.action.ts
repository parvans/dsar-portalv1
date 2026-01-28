"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { prisma } from "../../../prisma/seed"

/**
 * Helper: get ownerId from session cookie
 */
async function getOwnerId() {
  const session = (await cookies()).get("session")?.value
  if (!session) throw new Error("Unauthorized")

  const { id, role } = JSON.parse(session)
  if (role !== "owner") throw new Error("Forbidden")

  return id as string
}

export async function updateDsarStatusOwnerAction(
  dsarId: string,
  status: "open" | "in_progress" | "in_review" | "closed"
) {
    try {
        const ownerId = await getOwnerId()

        const dsar = await prisma.dsarRequest.findFirst({
            where: {
            id: dsarId,
            company: {
                ownerId,
            },
            },
        });

        if (!dsar) throw new Error("DSAR not found")

        await prisma.dsarRequest.update({
            where: { id: dsarId },
            data: { status },
        });
        revalidatePath("/owner")
    } catch (error) {
        console.log(error);
    }
  
}
