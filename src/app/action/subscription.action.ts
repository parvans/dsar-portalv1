"use server"

import { cookies } from "next/headers"
import { prisma } from "../../../prisma/seed"
import { stripe } from "@/lib/stripe";


export async function createCheckoutSession() {

    try {
            const session = (await cookies()).get('session')?.value;
    if(!session) throw new Error("Unauthorized");

    const {id:ownerId} = JSON.parse(session);

    const company = await prisma.company.findFirst({
        where:{
            ownerId
        }
    });

    if(!company) throw new Error("Company not found");

    const checkoutSession = await stripe.checkout.sessions.create({
        mode:"subscription",
        payment_method_types:["card"],
        line_items:[{
            price: process.env.STRIPE_PRICE_ID!,
            quantity: 1,
        }],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/owner?success=1`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/owner?canceled=1`,
        metadata: {
            companyId: company.id,
        },
    });

    return checkoutSession.url

    } catch (error) {
        console.log(error); 
    }
}