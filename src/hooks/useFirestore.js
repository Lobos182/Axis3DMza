import { useState, useEffect } from "react";

export const useFirestore = (asyncFn, dependencias = []) => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        setIsLoading(true)
        asyncFn().then(response => {
            setData(response)
        }).catch(error => {
            setError(error)
        }).finally(() => {
            setIsLoading(false)
        })
    }, dependencias)

    return {
        isLoading,
        data,
        error
    }
}