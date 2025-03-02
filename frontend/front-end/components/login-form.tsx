"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("");
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(""); // Clear previous errors

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log("Token received:", data.token);
        localStorage.setItem("token", data.token);
        router.push("/dashboard"); // Redirect on success
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Server error");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input 
          id="username" 
          name="username"  // ✅ Added name attribute
          type="text" 
          placeholder="johndoe" 
          required 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password" 
          name="password" // ✅ Added name attribute
          type="password" 
          required 
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input type="checkbox" id="remember" className="h-4 w-4" />
          <Label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </Label>
        </div>
        <Link href="/forgot-password" className="text-sm underline underline-offset-4 hover:text-primary">
          Forgot password?
        </Link>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>} {/* ✅ Shows error message */}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  )
}
