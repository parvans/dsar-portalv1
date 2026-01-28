"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createCompanyAction } from "@/app/action/company.action"
import { useState } from "react"

export function CompanyRegistrationForm() {
    const [representation, setRepresentation] = useState("")
  return (
    <form action={createCompanyAction}>
        <input
        type="hidden"
        name="representation"
        value={representation}
      />
      <Card>
        <CardHeader>
          <CardTitle>Register Your Company</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="name" placeholder="Company Name" required />

          <Input
            name="logoUrl"
            placeholder="Company Logo URL (optional)"
          />

          <Input
            name="email"
            placeholder="Company Email"
            type="email"
            required
          />

          <Input
            name="phone"
            placeholder="Company Phone"
            required
          />

          <Input
            name="address"
            placeholder="Company Address"
            className="md:col-span-2"
            required
          />

          <Input
            name="employeesCount"
            type="number"
            placeholder="Number of Employees"
            required
          />

          <Input
            name="field"
            placeholder="Field of Work / Service"
            required
          />

          <Select onValueChange={setRepresentation} required>
            <SelectTrigger>
              <SelectValue placeholder="Representation Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EU">EU</SelectItem>
              <SelectItem value="UK">UK</SelectItem>
              <SelectItem value="EU_UK">EU & UK</SelectItem>
            </SelectContent>
          </Select>

          <div className="md:col-span-2">
            <Button className="w-full mt-4">
              Submit for Approval
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
