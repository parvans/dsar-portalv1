import { DsarAdminTable } from "@/components/admin/dsar-table"
import { prisma } from "../../../../prisma/seed"
import { PendingCompaniesTable } from "@/components/admin/pending-companies-table"

export default async function AdminPage() {
  const pendingCompanies = await prisma.company.findMany({
    where: { status: "pending" },
    include: { owner: true },
    orderBy: { createdAt: "desc" },
  })

  const dsars = await prisma.dsarRequest.findMany({
    include: {
      company: true,
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  })

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Pending Companies */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Pending Company Registrations
        </h2>

        <PendingCompaniesTable companies={pendingCompanies} />
      </section>

      {/* DSAR Requests */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          All DSAR Requests
        </h2>

        <DsarAdminTable dsars={dsars} />
      </section>
    </div>
  )
}
