"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export function JoinGroupForm({ username }: { username: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:5000/api/join", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, groupID: code }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/dashboard/groups")
      } else {
        setError(data.error || "Failed to join group")
      }
    } catch (error) {
      setError("Server error, please try again")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="code">Group Code</Label>
        <Input
          id="code"
          placeholder="Enter group code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase()) // Convert input to uppercase
            setError("")
          }}
          className="font-mono text-lg uppercase tracking-wider text-center"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <div className="pt-2">
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Joining group...
            </>
          ) : (
            "Join Group"
          )}
        </Button>
      </div>
    </form>
  )
}
