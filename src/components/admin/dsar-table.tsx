"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateDsarStatusAdminAction } from "@/app/action/admin.action"

export function DsarAdminTable({ dsars }: { dsars: any[] }) {
  if (!dsars.length) {
    return <p className="text-muted-foreground">No DSAR requests</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Requester</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {dsars.map((dsar) => (
          <TableRow key={dsar.id}>
            <TableCell>{dsar.company.name}</TableCell>
            <TableCell>{dsar.requesterName}</TableCell>
            <TableCell>{dsar.requesterEmail}</TableCell>
            <TableCell>
              <form
                action={(formData) =>
                  updateDsarStatusAdminAction(
                    dsar.id,
                    formData.get("status") as any
                  )
                }
              >
                <Select
                  name="status"
                  defaultValue={dsar.status}
                  onValueChange={(value) => {
                    const fd = new FormData()
                    fd.set("status", value)
                    updateDsarStatusAdminAction(dsar.id, value as any)
                  }}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="in_review">In Review</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </form>
            </TableCell>
            <TableCell>
              {new Date(dsar.createdAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
