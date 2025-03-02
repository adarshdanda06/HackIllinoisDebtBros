import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (username, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:4000/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username.trim(), password: password.trim() }),
            });
            
            // 🔥 FIX: Ensure response is valid JSON before using it
            const json = await response.json();
            
            if (!response.ok) {
                throw new Error(json.error || "Signup failed");
            }

            // ✅ Store the full user object in localStorage (Including token)
            localStorage.setItem("user", JSON.stringify(json));

            // ✅ Dispatch full user object to context
            dispatch({ type: "LOGIN", payload: json });

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError(err.message);
        }
    };

    return { signup, isLoading, error };
};
