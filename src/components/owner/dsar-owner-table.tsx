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
import { updateDsarStatusOwnerAction } from "@/app/action/owner.action"

type Dsar = {
  id: string
  requesterName: string
  requesterEmail: string
  requesterPhone: string
  status: string
  createdAt: Date
}

export function DsarOwnerTable({ dsars }: { dsars: Dsar[] }) {
  if (!dsars.length) {
    return (
      <p className="text-muted-foreground">
        No DSAR requests yet.
      </p>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Requester</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {dsars.map((dsar) => (
          <TableRow key={dsar.id}>
            <TableCell>{dsar.requesterName}</TableCell>
            <TableCell>{dsar.requesterEmail}</TableCell>
            <TableCell>{dsar.requesterPhone}</TableCell>
            <TableCell>
              <Select
                defaultValue={dsar.status}
                onValueChange={(value) =>
                  updateDsarStatusOwnerAction(
                    dsar.id,
                    value as any
                  )
                }
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">
                    In Progress
                  </SelectItem>
                  <SelectItem value="in_review">
                    In Review
                  </SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
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
