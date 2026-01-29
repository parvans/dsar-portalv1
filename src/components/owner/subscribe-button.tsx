"use client"

import { createCheckoutSession } from "@/app/action/subscription.action"
import { Button } from "../ui/button"

export function SubscribeButton({ companyId }: { companyId: string }) {
  async function handleSubscribe() {
    const url = await createCheckoutSession(companyId)
    if (url) {
      window.location.href = url
    }
  }

  return (
    <Button onClick={handleSubscribe}>Subscribe</Button>
  )
}
