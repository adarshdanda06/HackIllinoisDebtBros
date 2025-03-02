import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/ui/Card"; 
import { CheckCircle, ArrowDown } from "lucide-react";  // If using Lucide Icons


const DebtsList = () => {
    const [debts, setDebts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch debts from backend
    useEffect(() => {
        const fetchDebts = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user")); // Ensure user is stored in local storage
                if (!user || !user.username) {
                    console.error("No user found in local storage");
                    return;
                }

                const response = await axios.post("http://localhost:4000/api/balance/debt", { username: user.username });
                setDebts(response.data);
            } catch (error) {
                console.error("Error fetching debts:", error.response?.data || error.message);
            } finally {
                setIsLoading(false)
            }
        };

        fetchDebts();
    }, []);

    if (isLoading) {
        return (
          <Card title="My Debts" className="mb-6">
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </Card>
        )
      }
    
    return (
    <Card title="My Debts" className="mb-6">
        {debts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
            <p>You don't have any debts</p>
        </div>
        ) : (
        <ul className="divide-y divide-border">
            {debts.map((debt) => (
            <li
                key={debt.friendName}
                className={`py-4 flex items-center justify-between ${debt.paid ? "opacity-60" : ""}`}
            >
                <div className="flex items-center">
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${debt.paid ? "bg-green-500/10" : "bg-primary/10"}`}
                >
                    {debt.paid ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                    <ArrowDown className="h-5 w-5 text-primary" />
                    )}
                </div>
                <div className="ml-3">
                    <p className="font-medium">
                    {debt.userName} owes {debt.friendName}
                    </p>
                    <p className="text-sm text-muted-foreground">{debt.paid ? "Paid" : "Unpaid"}</p>
                </div>
                </div>
                <span className="font-semibold text-lg">${debt.amount.toFixed(2)}</span>
            </li>
            ))}
        </ul>
        )}
    </Card>
    )
};

export default DebtsList;
