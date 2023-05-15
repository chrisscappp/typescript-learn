import { memo } from 'react'

const Optional = () => {

    interface User {
        login: string,
        password: string // optional это знак вопроса. используем или нет
    }

    interface UserPro {
        login: string,
        password?: {
            type: 'primary' | 'secondary'
            pass: string,
        }
        auth?: 1 | 0
    }

    const user: User = {
        login: 'asd',
        password: '123'
    }

    function testPass (user: UserPro) {
        const t = user.password?.type // ts тоже определяет есть ли пароль или нет
        const t2 = user.password!.type // говорим тс что тут не будет undefined 100 %, но нерекомендуется
    }

    function multiply(first: number, second?: number): number {
        return first
        if (second !== undefined) {
            return first
        }
        return first * first
    } // запись second? эквивалента number | undefined, в отличие от интерфейса

    function test(param?: string) {
        const p = param ?? multiply(2) // если param null or undefined то вернём значение из фукнции
        console.log(p)
    }

    test()

    return (
        <>
            opt
        </>
    )
}

export default memo(Optional)