import { memo } from 'react'

const TypeGuard = () => {

    /*

    interface IUser {
        name: string,
        email: string,
        login: string
    }


    interface IAdmin {
        name: string,
        role: number
    }
    

    const user: IUser = {
        name: "Вася",
        email: "vasya@mail.ru",
        login: "krot707"
    }

    function isAdmin(user: IUser | IAdmin): user is IAdmin {
        return 'role' in user
    } // база. проверка на то, что юсер жто админ

    function isAdminAlt(user: IUser | IAdmin): user is IAdmin {
        return (user as IAdmin).role !== undefined
    } // можно проверить вложенные свойства

    function setRole(user: IUser | IAdmin) {
        if (isAdminAlt(user)) {
            user.role = 0
        } else {
            user
        }
    }

    function isString(x: number | string): x is string {
        return typeof x === "string"
    } // функция typeguard, которая проверит что x это строка

    function logId(id: number | string) {
        if (isString(id)) {
            console.log(id);
        } else {
            console.log(id);
        }
    }

    */

    // typeguard ограничивает поток типов

    return (
        <>
            tg
        </>
    )
}

export default memo(TypeGuard)