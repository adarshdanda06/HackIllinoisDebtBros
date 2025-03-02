import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Printer } from "lucide-react"
import Link from "next/link"
import { ReceiptDetail } from "@/components/receipt-detail"

export default function ReceiptDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/receipts">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Receipt Details</h2>
            <p className="text-muted-foreground">View and manage receipt items</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button variant="outline" className="gap-1">
            <Printer className="h-4 w-4" /> Print
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grocery Shopping</CardTitle>
          <CardDescription>Uploaded on May 15, 2023 • Roommates Group</CardDescription>
        </CardHeader>
        <CardContent>
          <ReceiptDetail id={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}

