"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { submitDsarAction } from "@/app/action/dsar.actions"

export function DsarForm({ companyId }: { companyId: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null);

  async function action(formData: FormData) {
    setError(null);
    try {
      await submitDsarAction(formData)
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
      }, 5000);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  if (submitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Request Submitted</CardTitle>
        </CardHeader>
        <CardContent>
          Thank you. Your DSAR request has been submitted successfully.
        </CardContent>
      </Card>
    )
  }

  return (
    <form action={action}>
      <input type="hidden" name="companyId" value={companyId} />

      <Card>
        <CardHeader>
          <CardTitle>Submit DSAR</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            name="requesterName"
            placeholder="Your Name"
            required
          />
          <Input
            name="requesterEmail"
            type="email"
            placeholder="Your Email"
            required
          />
          <Input
            name="requesterPhone"
            placeholder="Your Phone"
            required
          />
          <Textarea
            name="requestText"
            placeholder="Request details"
            required
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button className="w-full">
            Submit Request
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
