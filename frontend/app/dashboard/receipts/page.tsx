import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { ReceiptList } from "@/components/receipt-list"

export default function ReceiptsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Receipts</h2>
          <p className="text-muted-foreground">Upload and manage your receipts</p>
        </div>
        <Link href="/dashboard/receipts/upload">
          <Button className="gap-1">
            <Plus className="h-4 w-4" /> Upload Receipt
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Receipts</CardTitle>
          <CardDescription>View and manage all your uploaded receipts</CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search receipts..." className="pl-8" />
            </div>
            <Button variant="outline">Search</Button>
          </div>
        </CardHeader>
        <CardContent>
          <ReceiptList />
        </CardContent>
      </Card>
    </div>
  )
}

