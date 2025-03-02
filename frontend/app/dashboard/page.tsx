import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Users, Receipt, ArrowRight, CreditCard } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, John! Here's an overview of your groups and balances.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/groups/create">
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> Create Group
            </Button>
          </Link>
          <Link href="/dashboard/groups/join">
            <Button variant="outline" className="gap-1">
              <Users className="h-4 w-4" /> Join Group
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Owed to You</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">$245.00</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total You Owe</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">$120.50</div>
            <p className="text-xs text-muted-foreground">-5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Groups</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Across 8 friends</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Your Groups</CardTitle>
            <CardDescription>Groups you've created or joined</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Roommates</p>
                  <p className="text-sm text-muted-foreground">4 members</p>
                </div>
                <Link href="/dashboard/groups/1">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Weekend Trip</p>
                  <p className="text-sm text-muted-foreground">6 members</p>
                </div>
                <Link href="/dashboard/groups/2">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/groups">
              <Button variant="outline" size="sm" className="gap-1">
                View All Groups <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Receipts</CardTitle>
            <CardDescription>Recently uploaded receipts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Grocery Shopping</p>
                  <p className="text-sm text-muted-foreground">$86.45 • 3 days ago</p>
                </div>
                <Link href="/dashboard/receipts/1">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Dinner</p>
                  <p className="text-sm text-muted-foreground">$124.80 • 1 week ago</p>
                </div>
                <Link href="/dashboard/receipts/2">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/receipts">
              <Button variant="outline" size="sm" className="gap-1">
                View All Receipts <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

