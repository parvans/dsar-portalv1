import { cookies } from "next/headers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DsarOwnerTable } from "@/components/owner/dsar-owner-table"
import { prisma } from "../../../../prisma/seed"
import { CompanyRegistrationForm } from "@/components/owner/company-registration-form"
import { logoutAction } from "@/app/action/auth.action"
import { Button } from "@/components/ui/button"

export default async function OwnerDashboard() {
  const session = JSON.parse((await cookies()).get("session")!.value)

  const company = await prisma.company.findFirst({
    where: { ownerId: session.id },
    include: {
      dsarRequests: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  })

  if (!company) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Owner Dashboard</h1>
        <CompanyRegistrationForm />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
     <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold">Owner Dashboard</h1>
        <Button className="hover:bg-red-400"
        variant={"secondary"} 
        onClick={logoutAction}>
          Logout
        </Button>
      </div>

      {/* Company Info */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{company.name}</CardTitle>
          <Badge variant={company.status === "approved" ? "default" : "destructive"}>
            {company.status}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <p>Field: {company.field}</p>
          <p>Employees: {company.employeesCount}</p>
          <p>Representation: {company.representation}</p>
          <p>
            Subscription:{" "}  
            <b className="capitalize">{company.subscriptionStatus}</b>
          </p>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          DSAR Requests
        </h2>

        <DsarOwnerTable dsars={company.dsarRequests} />
      </section>
    </div>
  )
}
