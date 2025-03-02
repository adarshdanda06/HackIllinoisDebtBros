export const getUsername = (): string | null => {
    if (typeof window !== "undefined") {  // ✅ Ensure it runs only on the client side
        const userData = localStorage.getItem("user");
        
        if (userData) {
            try {
                const user: { username: string } = JSON.parse(userData);
                return user.username;
            } catch (error) {
                console.error("Error parsing user data:", error);
                return null;
            }
        }
    }
    return null;
};
