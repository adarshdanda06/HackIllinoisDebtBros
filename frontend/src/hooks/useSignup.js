import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (username, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({username, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save user information to local storage
            localStorage.setItem('user', JSON.stringify({
                username: json.username,
                groupID: json.groupID
            }))

            // update auth context
            dispatch({type: 'SIGNUP', payload: json})

            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}