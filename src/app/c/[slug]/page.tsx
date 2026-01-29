import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DsarForm } from "@/components/public/dsar-form"
import { prisma } from "@/lib/prisma"


type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function PublicCompanyPage({ params }: PageProps) {
  const { slug } = await params
  const company = await prisma.company.findFirst({
    where: { slug:slug },
  })

  if (!company) return notFound()

  // Not approved
  if (company.status !== "approved") {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Company Not Available</CardTitle>
          </CardHeader>
          <CardContent>
            This company is not approved yet.
          </CardContent>
        </Card>
      </div>
    )
  }

  // Subscription inactive
  if (
    company.subscriptionStatus !== "active" &&
    company.subscriptionStatus !== "trialing"
  ) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>{company.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-muted-foreground">
              This company’s DSAR portal is currently inactive.
            </p>
            <Badge variant="outline">
              Subscription inactive
            </Badge>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Active
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{company.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <p>Field: {company.field}</p>
          <p>Employees: {company.employeesCount}</p>
          <p>Representation: {company.representation}</p>
        </CardContent>
      </Card>

      <DsarForm companyId={company.id} />
    </div>
  )
}
