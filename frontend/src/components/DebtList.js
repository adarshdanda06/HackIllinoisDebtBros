import { useState } from "react";

const DebtsList = () => {
    const [debts, setDebts] = useState([
        { id: 1, name: "Alice", amount: 50, paid: false },
        { id: 2, name: "Bob", amount: 100, paid: true },
        { id: 3, name: "Charlie", amount: 75, paid: false }
    ]);

    // Toggle debt status (Paid/Unpaid)
    const togglePaidStatus = (id) => {
        setDebts(debts.map(debt => 
            debt.id === id ? { ...debt, paid: !debt.paid } : debt
        ));
    };

    return (
        <div className="debts-container">
            <h2>Debt List</h2>
            <ul>
                {debts.map(debt => (
                    <li key={debt.id} className={debt.paid ? "paid" : "unpaid"}>
                        {debt.name} owes ${debt.amount} 
                        <button onClick={() => togglePaidStatus(debt.id)}>
                            {debt.paid ? "Mark Unpaid" : "Mark Paid"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DebtsList;
