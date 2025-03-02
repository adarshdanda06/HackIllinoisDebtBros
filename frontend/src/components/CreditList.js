import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/ui/Card"; 
import { ArrowUp} from "lucide-react";  


const CreditList = () => {
    const [credits, setCredits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const response = await axios.get("/api/balance/credit", {
                    headers: { "Content-Type": "application/json" }
                });
                setCredits(response.data); // Set credit data from API
            } catch (error) {
                console.error("Error fetching credits:", error);
            } finally {
                setIsLoading(false)
            }
        };

        fetchCredits();
    }, []);

    if (isLoading) {
        return (
          <Card title="My Credits" className="mb-6">
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </Card>
        )
      }
    
      return (
        <Card title="My Credits">
          {credits.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>You don't have any credits</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {credits.map((credit) => (
                <li key={credit.friendName} className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <ArrowUp className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{credit.friendName} owes you</p>
                      <p className="text-sm text-muted-foreground">Pending payment</p>
                    </div>
                  </div>
                  <span className="font-semibold text-lg">${credit.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )
};

export default CreditList;
