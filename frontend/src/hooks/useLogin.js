import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:4000/api/user/login", {  // ✅ Ensure port 4000
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error || "Login failed");
            }

            // ✅ Store full user object, including token
            localStorage.setItem("user", JSON.stringify(json));

            // ✅ Dispatch user object
            dispatch({ type: "LOGIN", payload: json });

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError(err.message);
        }
    };

    return { login, isLoading, error };
};
