import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BalanceList } from "@/components/balance-list"

export default function BalancesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Balances</h2>
          <p className="text-muted-foreground">Track who owes you and who you owe</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="all">All Balances</TabsTrigger>
          <TabsTrigger value="owed">Owed to You</TabsTrigger>
          <TabsTrigger value="owing">You Owe</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Balances</CardTitle>
              <CardDescription>View all your balances across all groups</CardDescription>
            </CardHeader>
            <CardContent>
              <BalanceList filter="all" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="owed">
          <Card>
            <CardHeader>
              <CardTitle>Owed to You</CardTitle>
              <CardDescription>People who owe you money</CardDescription>
            </CardHeader>
            <CardContent>
              <BalanceList filter="owed" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="owing">
          <Card>
            <CardHeader>
              <CardTitle>You Owe</CardTitle>
              <CardDescription>People you owe money to</CardDescription>
            </CardHeader>
            <CardContent>
              <BalanceList filter="owing" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

