"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { approveCompanyAction, rejectCompanyAction } from "@/app/action/admin.action"

export function PendingCompaniesTable({ companies }: { companies: any[] }) {
  if (!companies.length) {
    return <p className="text-muted-foreground">No pending companies</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Employees</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {companies.map((company) => (
          <TableRow key={company.id}>
            <TableCell>{company.name}</TableCell>
            <TableCell>{company.owner.email}</TableCell>
            <TableCell>{company.employeesCount}</TableCell>
            <TableCell className="space-x-2">
              <form
                action={() => approveCompanyAction(company.id)}
                className="inline"
              >
                <Button size="sm">Approve</Button>
              </form>

              <form
                action={() => rejectCompanyAction(company.id)}
                className="inline"
              >
                <Button size="sm" variant="destructive">
                  Reject
                </Button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
