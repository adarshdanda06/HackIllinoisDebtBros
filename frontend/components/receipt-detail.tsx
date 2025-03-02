"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data
const receiptItems = [
  { id: 1, name: "Milk", price: 3.99 },
  { id: 2, name: "Bread", price: 2.49 },
  { id: 3, name: "Eggs", price: 4.99 },
  { id: 4, name: "Cheese", price: 5.99 },
  { id: 5, name: "Apples", price: 4.49 },
  { id: 6, name: "Chicken", price: 8.99 },
  { id: 7, name: "Rice", price: 3.49 },
  { id: 8, name: "Pasta", price: 1.99 },
  { id: 9, name: "Tomatoes", price: 2.99 },
  { id: 10, name: "Cereal", price: 4.29 },
]

const groupMembers = [
  { id: 1, name: "You" },
  { id: 2, name: "Alex" },
  { id: 3, name: "Sam" },
  { id: 4, name: "Jordan" },
]

type ItemAssignment = {
  itemId: number
  assignedTo: number | "split"
}

export function ReceiptDetail({ id }: { id: string }) {
  const [assignments, setAssignments] = useState<ItemAssignment[]>(
    receiptItems.map((item) => ({ itemId: item.id, assignedTo: "split" })),
  )

  const handleAssignmentChange = (itemId: number, value: string) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.itemId === itemId
          ? { ...assignment, assignedTo: value === "split" ? "split" : Number.parseInt(value) }
          : assignment,
      ),
    )
  }

  const getTotalAmount = () => {
    return receiptItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label className="mb-2 block">Receipt Image</Label>
          <div className="overflow-hidden rounded-lg border bg-muted/40">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Receipt"
              width={400}
              height={300}
              className="h-[300px] w-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Receipt Summary</Label>
            <div className="rounded-lg border p-4">
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium">Date:</dt>
                  <dd>May 15, 2023</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Store:</dt>
                  <dd>Grocery Market</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Total Amount:</dt>
                  <dd className="font-bold">${getTotalAmount()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Status:</dt>
                  <dd>
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                      Pending
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div>
            <Label className="mb-2 block">Group Members</Label>
            <div className="flex flex-wrap gap-2">
              {groupMembers.map((member) => (
                <div
                  key={member.id}
                  className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-sm font-medium"
                >
                  {member.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium">Receipt Items</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Assign each item to a specific person or split it evenly among all members.
        </p>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Assign To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receiptItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Select
                      value={
                        assignments.find((a) => a.itemId === item.id)?.assignedTo === "split"
                          ? "split"
                          : assignments.find((a) => a.itemId === item.id)?.assignedTo.toString()
                      }
                      onValueChange={(value) => handleAssignmentChange(item.id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Assign to..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="split">Split Evenly</SelectItem>
                        {groupMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id.toString()}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Save Assignments</Button>
      </div>
    </div>
  )
}

