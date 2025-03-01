import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { CreateGroupForm } from "@/components/create-group-form"

export default function CreateGroupPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/groups">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Create Group</h2>
          <p className="text-muted-foreground">Create a new expense tracking group</p>
        </div>
      </div>

      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Group Details</CardTitle>
          <CardDescription>Fill in the details to create your new group</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateGroupForm />
        </CardContent>
      </Card>
    </div>
  )
}

