import { memo } from 'react'

interface IUser {
    id: number,
    login: string,
    password: string,
    name: string
}

interface IRequest {
    status: 1 | 0,
    method: string,
    body: IUser | undefined
}

enum FetchMethods {
    GET = 'get',
    POST = 'post'
} // через этот энам тоже можно делать union types

const FetchFunctions = () => {

    const url: string = "https://aboba.ru"
    const users: IUser[] = [
        {id: 1, login: 'krot228', password: '123', name: "Артемий Татьянович"},
        {id: 2, login: 'sus22', password: '321', name: "Виталий Леопардович"},
        {id: 3, login: 'kat68', password: 'skipidar', name: "Игорь Натальевич"},
    ]

    function fetchWithAuth (url: string, us: IUser[], method: 'get' | 'post'): IRequest {
        //в теории мы получим массив пользователей по url и по method сделаем запрос
        const findUser: IUser | undefined = us.find(user => {
            return (user.login === 'krot2289' && user.password === '123')
        })
        const data: IRequest = {
            status: 1,
            method: method,
            body: findUser
        }
        if (findUser === undefined) {
            data.status = 0;
            return data;
        }            
        return data;
    }

    const authState = fetchWithAuth(url, users, 'post')

    return (
        <>
            {
                authState.status === 1 ? <h3>Auth is done</h3> : <h3>No auth</h3>
            }
        </>
    )
}

export default memo(FetchFunctions)