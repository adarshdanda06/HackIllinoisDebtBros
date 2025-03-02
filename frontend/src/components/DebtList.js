import { useState, useEffect } from "react";
import axios from "axios";

const DebtsList = () => {
    const [debts, setDebts] = useState([]);

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
            }
        };

        fetchDebts();
    }, []);

    return (
        <div className="debts-container">
            <h2>Debt List</h2>
            <ul>
                {debts.map(debt => (
                    <li key={debt.friendName} className={debt.paid ? "paid" : "unpaid"}>
                        {debt.userName} owes {debt.friendName} ${debt.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DebtsList;
