"use server"


import { revalidatePath } from "next/cache"
import { prisma } from "../../../prisma/seed"

export async function submitDsarAction(formData: FormData) {
    try {
        if(!formData.get("companyId") || !formData.get("requesterName") || !formData.get("requesterEmail") || !formData.get("requesterPhone") || !formData.get("requestText")) return;        
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
        
    }
}
