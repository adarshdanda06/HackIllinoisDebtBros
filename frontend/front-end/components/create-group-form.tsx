"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function CreateGroupForm({ username }: { username: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [groupID, setGroupID] = useState("")
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  const fetchGroupCode = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`http://localhost:5000/api/group-id?username=${username}`, {
        method: "GET", // ✅ Now using GET instead of POST
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json()

      if (response.ok) {
        setGroupID(data.groupID) // ✅ Store the received group ID
      } else {
        console.error("Failed to fetch group ID:", data.error)
      }
    } catch (error) {
      console.error("Error fetching group ID:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(groupID)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6 text-center">
      {!groupID ? (
        <Button onClick={fetchGroupCode} className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Fetching Group ID...
            </>
          ) : (
            "Create Group"
          )}
        </Button>
      ) : (
        <>
          <p className="text-muted-foreground">
            This is your unique group ID. Share it to let others join.
          </p>

          <div className="mx-auto max-w-xs">
            <Card className="bg-muted/30 p-6">
              <div className="text-4xl font-bold tracking-wider font-mono text-primary">
                {groupID}
              </div>
            </Card>
          </div>

          <div className="pt-2 space-y-4">
            <Button onClick={handleCopyCode} variant="outline" className="w-full gap-2">
              {copied ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy Code</>}
            </Button>

            <Button onClick={() => router.push("/dashboard/groups")} className="w-full">
              Done
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

