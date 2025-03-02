import { useState, useEffect } from "react";
import axios from "axios";

const CreditList = () => {
    const [credits, setCredits] = useState([]);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const response = await axios.get("/api/balance/credit", {
                    headers: { "Content-Type": "application/json" }
                });
                setCredits(response.data); // Set credit data from API
            } catch (error) {
                console.error("Error fetching credits:", error);
            }
        };

        fetchCredits();
    }, []);

    return (
        <div className="credits-container">
            <h2>Credit List</h2>
            <ul>
                {credits.map((credit) => (
                    <li key={credit.friendName}>
                        {credit.friendName} owes you ${credit.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CreditList;
