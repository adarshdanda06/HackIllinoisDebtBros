"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const receipts = [
  {
    id: "1",
    name: "Grocery Shopping",
    date: "2023-05-15",
    amount: 86.45,
    group: "Roommates",
    status: "Settled",
  },
  {
    id: "2",
    name: "Dinner",
    date: "2023-05-10",
    amount: 124.8,
    group: "Weekend Trip",
    status: "Pending",
  },
  {
    id: "3",
    name: "Movie Night",
    date: "2023-05-05",
    amount: 42.5,
    group: "Roommates",
    status: "Pending",
  },
  {
    id: "4",
    name: "Gas",
    date: "2023-04-28",
    amount: 35.75,
    group: "Weekend Trip",
    status: "Settled",
  },
  {
    id: "5",
    name: "Utilities",
    date: "2023-04-20",
    amount: 95.2,
    group: "Roommates",
    status: "Pending",
  },
]

export function ReceiptList() {
  const [receiptList, setReceiptList] = useState(receipts)

  const handleDelete = (id: string) => {
    setReceiptList(receiptList.filter((receipt) => receipt.id !== id))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {receiptList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No receipts found.
              </TableCell>
            </TableRow>
          ) : (
            receiptList.map((receipt) => (
              <TableRow key={receipt.id}>
                <TableCell className="font-medium">{receipt.name}</TableCell>
                <TableCell>{receipt.date}</TableCell>
                <TableCell>${receipt.amount.toFixed(2)}</TableCell>
                <TableCell>{receipt.group}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      receipt.status === "Settled"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {receipt.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/receipts/${receipt.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(receipt.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

