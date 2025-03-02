import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CreditCard, Receipt, Users, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b border-border/40">
        <Link href="/" className="flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Debt Bros</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
            Login
          </Link>
          <Link href="/signup" className="text-sm font-medium hover:underline underline-offset-4">
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-background/90">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  Managing Debt. Saving Friendships.
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Keeping tabs of promises has never been easier...
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="gap-1">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center gap-2 rounded-lg border p-6 bg-card shadow-sm transition-all hover:shadow-md">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Create or Join Groups</h3>
                <p className="text-center text-muted-foreground">
                  Start a new group with friends or join an existing one with a simple join code.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border p-6 bg-card shadow-sm transition-all hover:shadow-md">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Receipt className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Upload Receipts</h3>
                <p className="text-center text-muted-foreground">
                  Easily upload receipts and assign items to specific friends or split costs evenly.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border p-6 bg-card shadow-sm transition-all hover:shadow-md">
                <div className="p-2 bg-primary/10 rounded-full">
                  <CreditCard className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Track Balances</h3>
                <p className="text-center text-muted-foreground">
                  See at a glance who owes you and who you owe with our intuitive dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Debt Bros. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

