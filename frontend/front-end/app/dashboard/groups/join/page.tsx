import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { JoinGroupForm } from "@/components/join-group-form"

export default function JoinGroupPage() {
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
          <h2 className="text-3xl font-bold tracking-tight">Join Group</h2>
          <p className="text-muted-foreground">Enter a group code to join</p>
        </div>
      </div>

      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Enter Group Code</CardTitle>
          <CardDescription>Ask your friend for the 6-character group code</CardDescription>
        </CardHeader>
        <CardContent>
          <JoinGroupForm/>
        </CardContent>
      </Card>
    </div>
  )
}

