"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Copy, Trash2, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type Group = {
  id: string
  name: string
  members: number
  joinCode: string
  createdAt: string
}

const groups: Group[] = [
  {
    id: "1",
    name: "Roommates",
    members: 4,
    joinCode: "ROOM123",
    createdAt: "2 months ago",
  },
  {
    id: "2",
    name: "Weekend Trip",
    members: 6,
    joinCode: "TRIP456",
    createdAt: "3 weeks ago",
  },
]

export function GroupList() {
  const [groupList, setGroupList] = useState(groups)

  const handleDelete = (id: string) => {
    setGroupList(groupList.filter((group) => group.id !== id))
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert(`Join code ${code} copied to clipboard!`)
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {groupList.length === 0 ? (
        <div className="col-span-full flex h-[200px] items-center justify-center rounded-lg border border-dashed">
          <div className="flex flex-col items-center gap-1 text-center">
            <Users className="h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-medium">No groups found</h3>
            <p className="text-sm text-muted-foreground">Create a new group or join an existing one.</p>
          </div>
        </div>
      ) : (
        groupList.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
              <CardDescription>
                {group.members} members • Created {group.createdAt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Join Code</p>
                  <p className="text-sm font-mono">{group.joinCode}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleCopyCode(group.joinCode)}>
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy code</span>
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                onClick={() => handleDelete(group.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
              <Link href={`/dashboard/groups/${group.id}`}>
                <Button size="sm" className="gap-1">
                  View <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}

