import axios from 'axios'
import AxiosError from 'axios-error'
import { useState, useEffect } from 'react'
import { IUser } from '../models'

export function useUsers () {
    const [users, setUsers] = useState<IUser[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const url: string = "https://jsonplaceholder.typicode.com/users"

    async function fetchUsers () {
        try {
            setError('')
            setIsLoading(true)
            const response = await axios.get<IUser[]>(url)
            setUsers(response.data)
            setIsLoading(false)
            
        } catch (e: unknown) {
            const err = e as AxiosError
            setError(err.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return { users, error, isLoading }

}
