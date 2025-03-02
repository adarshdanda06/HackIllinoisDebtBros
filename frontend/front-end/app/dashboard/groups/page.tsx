import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Users } from "lucide-react"
import Link from "next/link"
import { GroupList } from "@/components/group-list"

export default function GroupsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Groups</h2>
          <p className="text-muted-foreground">Manage your expense groups</p>
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

      <Card>
        <CardHeader>
          <CardTitle>Your Groups</CardTitle>
          <CardDescription>Groups you've created or joined</CardDescription>
        </CardHeader>
        <CardContent>
          <GroupList />
        </CardContent>
      </Card>
    </div>
  )
}

