import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export const POST = async(req:NextRequest)=>{
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error) {
        return new Response("Webhook error", { status: 400 })
    }

    if(event.type === "checkout.session.completed"){
        const session = event.data.object as Stripe.Checkout.Session;

        const companyId = session.metadata?.companyId;

        if(companyId){
            await prisma?.company.update({
                where:{id:companyId},
                data:{
                    stripeCustomerId: session.customer as string,
                    stripeSubscriptionId: session.subscription as string,
                    subscriptionStatus: "active",
                }
            });
        }
    }

    return new Response("ok");
}