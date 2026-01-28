"use server"

import slugify from "slugify"
import { revalidatePath } from "next/cache"
import { prisma } from "../../../prisma/seed"

export async function approveCompanyAction(companyId: string) {
    try {
        if(!companyId) return;
        const company = await prisma.company.findUnique({ where: { id: companyId } })
        if (!company) throw new Error("Company not found");

        const slug = `${slugify(company.name, { lower: true })}-${Math.random()
            .toString(36)
            .slice(2, 6)}`

        await prisma.company.update({
            where: { id: companyId },
            data: { status: "approved", slug },
        })

        revalidatePath("/admin");

    } catch (error) {
        console.log(error);
    }
  
}

export async function rejectCompanyAction(companyId: string) {
    try {
        if(!companyId) return;
        await prisma.company.update({ 
            where: { id: companyId },
            data: { status: "rejected" }
        })
        revalidatePath("/admin");
    } catch (error) {
        console.log(error);
    } 
}

export async function updateDsarStatusAdminAction(  dsarId: string,
  status: "open" | "in_progress" | "in_review" | "closed") {

    try {
        if(!dsarId) return;
        await prisma.dsarRequest.update({ 
            where: { id: dsarId },
            data: { status }
        })
        revalidatePath("/admin");
    } catch (error) {
        console.log(error);
    }    
}
