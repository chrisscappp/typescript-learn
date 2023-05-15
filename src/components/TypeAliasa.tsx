import { memo } from 'react'

const TypeAliasa = () => {

    type httpMethod = 'get' | 'post' // union type

    type IUser = {
        name: string,
        age: number,
        username: string
    } // как interface

    type Role = {
        id: number
    }

    type UserWithRole = IUser & Role // intersection. объединение user и role

    const user: UserWithRole = {
        name: 'Игорь Натальевич',
        age: 22,
        username: 'skipidar29',
        id: 1
    }

    // другой вариант

    type CarName = {
        brand: string,
        name: string
        weight: number
    }

    type CarEngine = {
        name: string,
        brand: string,
        power: number,
        weight: number
    }

    type Car = {
        info: CarName,
        engine: CarEngine
    } // сделали такое объединение тк у нас может быть перекликание с name или brand или weight

    const car: Car = {
        info: {
            name: 'E34',
            brand: 'BMW',
            weight: 223
        },
        engine: {
            name: 'JZX-500',
            brand: 'Toyota',
            power: 999,
            weight: 100
        }
    } 

    console.log(car);
    
    function fetchWithAuth(url: string, method: httpMethod): 1 | 0 {
        return 1;
    }

    const method = 'get'

    fetchWithAuth('isrul', method)

    return (
        <>
            is typeas
        </>
    )
}

export default memo(TypeAliasa)