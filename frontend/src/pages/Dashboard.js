"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "../components/layout/DashboardLayout"
import UploadReceipt from "../components/UploadReceipt"
import DebtsList from "../components/DebtList"
import CreditList from "../components/CreditList"
import { CreditCard, DollarSign, TrendingUp, Users } from 'lucide-react'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [groupID, setGroupID] = useState(null)

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        setUser(userData.username)
        setGroupID(userData.groupID)
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    }
  }, [])

  const stats = [
    {
      title: "Total Spent",
      value: "$1,245.89",
      change: "+12.5%",
      icon: DollarSign,
      iconColor: "text-primary bg-primary/10",
    },
    {
      title: "Total Owed",
      value: "$345.20",
      change: "-5.2%",
      icon: CreditCard,
      iconColor: "text-orange-500 bg-orange-500/10",
    },
    {
      title: "Total Credits",
      value: "$567.40",
      change: "+8.1%",
      icon: TrendingUp,
      iconColor: "text-green-500 bg-green-500/10",
    },
    {
      title: "Group Members",
      value: "5",
      change: "+1 new",
      icon: Users,
      iconColor: "text-blue-500 bg-blue-500/10",
    },
  ]

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.change} from last month</p>
              </div>
              <div className={`w-12 h-12 rounded-full ${stat.iconColor} flex items-center justify-center`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <UploadReceipt />
          <DebtsList />
        </div>
        <div>
          <CreditList />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard

