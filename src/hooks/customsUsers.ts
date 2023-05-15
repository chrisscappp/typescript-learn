import { DATABASE_URL, USERS } from '../api/url'
import { getData } from '../api/get/getData'
import { useState, useEffect } from 'react'
import AxiosError from 'axios-error'

interface IUser {
    id: number,
    name: string,
    age: number | string,
    email: string
}

export function useCustomsUsers () {

    type httpMethod = 'get' | 'post'
    const url: string = DATABASE_URL + USERS

    const [customsUsers, setCustomsUsers] = useState<IUser[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<string>('')
    
   useEffect(() => {
        getData<IUser[]>(url)
            .then((res) => {
                    setIsError('')
                    setCustomsUsers(res)
                    setLoading(false)
                }
            )
            .catch((e: unknown) => {
                    if (e instanceof AxiosError) {
                        setIsError(e.message)
                        setLoading(false)
                    }
                }   
            )
   }, [])

   return { customsUsers, isError, loading }
}