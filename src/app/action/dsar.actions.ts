"use server"


import { revalidatePath } from "next/cache"
import { prisma } from "../../../prisma/seed"
import { getClientIp } from "@/lib/get-client-ip"

const MAX_REQUEST = 5
const WINDOW_MIN = 60

export async function submitDsarAction(formData: FormData) {
    try {
      const companyId = formData.get("companyId") as string
      if (!companyId) throw new Error("Invalid company");
      const ip = getClientIp();
      const since = new Date(
        Date.now() - WINDOW_MIN * 60 * 1000
      );

      const recentCount = await prisma.dsarRequest.count({
      where: {
        companyId,
        createdAt: {
          gte: since,
        },
        requesterEmail: formData.get("requesterEmail") as string,
      },
    })

    if (recentCount >= MAX_REQUEST) {
      throw new Error(
        "Too many requests. Please try again later."
      )
    }

    await prisma.dsarRequest.create({
      data: {
        companyId: formData.get("companyId") as string,
        requesterName: formData.get("requesterName") as string,
        requesterEmail: formData.get("requesterEmail") as string,
        requesterPhone: formData.get("requesterPhone") as string,
        requestText: formData.get("requestText") as string,
      },
    })
  
    console.log("📧 Email stub: DSAR submitted")
    revalidatePath("/owner")
    } catch (error) {
      console.log("DSAR Error:",error);
      throw error
    }
}
