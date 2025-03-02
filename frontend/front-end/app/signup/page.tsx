import Link from "next/link"
import { CreditCard } from "lucide-react"
import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Debt Bros</span>
        </Link>
        <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-muted-foreground">Enter your information to create an account</p>
          </div>
          <SignupForm />
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4 hover:text-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

