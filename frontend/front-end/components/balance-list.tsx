"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreditCard, Send } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Balance = {
  id: string
  person: string
  amount: number
  group: string
  lastUpdated: string
}

const balances: Balance[] = [
  {
    id: "1",
    person: "Alex",
    amount: 45.5,
    group: "Roommates",
    lastUpdated: "2 days ago",
  },
  {
    id: "2",
    person: "Sam",
    amount: 25.75,
    group: "Roommates",
    lastUpdated: "1 week ago",
  },
  {
    id: "3",
    person: "Jordan",
    amount: -32.2,
    group: "Weekend Trip",
    lastUpdated: "3 days ago",
  },
  {
    id: "4",
    person: "Taylor",
    amount: 15.0,
    group: "Weekend Trip",
    lastUpdated: "5 days ago",
  },
  {
    id: "5",
    person: "Morgan",
    amount: -18.5,
    group: "Roommates",
    lastUpdated: "1 day ago",
  },
]

export function BalanceList({ filter = "all" }: { filter?: "all" | "owed" | "owing" }) {
  const [balanceList, setBalanceList] = useState(balances)

  const filteredBalances = balanceList.filter((balance) => {
    if (filter === "all") return true
    if (filter === "owed") return balance.amount > 0
    if (filter === "owing") return balance.amount < 0
    return true
  })

  const handleSettleUp = (id: string) => {
    setBalanceList(balanceList.map((balance) => (balance.id === id ? { ...balance, amount: 0 } : balance)))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Person</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBalances.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No balances found.
              </TableCell>
            </TableRow>
          ) : (
            filteredBalances.map((balance) => (
              <TableRow key={balance.id}>
                <TableCell className="font-medium">{balance.person}</TableCell>
                <TableCell>{balance.group}</TableCell>
                <TableCell>
                  <span className={balance.amount > 0 ? "text-green-500" : balance.amount < 0 ? "text-red-500" : ""}>
                    {balance.amount > 0 ? "+" : ""}
                    {balance.amount.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell>{balance.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {balance.amount !== 0 && (
                      <Button variant="outline" size="sm" className="gap-1" onClick={() => handleSettleUp(balance.id)}>
                        {balance.amount > 0 ? (
                          <>
                            <CreditCard className="h-4 w-4" /> Request
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" /> Pay
                          </>
                        )}
                      </Button>
                    )}
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

