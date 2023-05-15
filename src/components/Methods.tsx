import { memo } from 'react'

interface IUser {
    id: number,
    name: string
}

const Methods = () => {

    // SPLICE
    const array_splice: [...number[]] = [1,2,3,4,5,6,7,8,9,10]
    const new_array_splice: number[] = array_splice.splice(0, 4, 99) //удалили элементы начиная с arr[0], 4 штуки, вставили 99 
    //splice вернёт массив из удалённых элементов

    // SLICE - arr.slice() - создаст копию массива
    const arr_slice: string[] = ["H", "U", "I", "L", "A"]
    const new_arr_slice: string[] = arr_slice.slice(0, 4)
    //возвращает новый массив, в который копирует значения с 0 до 4

    // CONCAT создаёт новый массив в который копирует значения из старых
    const arr_concat1: IUser[] = [{id: 1, name: "Vasya"}, {id: 2, name: "Gena"}]
    const arr_concat2: IUser[] = [{id: 3, name: "Petya"}, {id: 4, name: "Kesha"}]
    //console.log(arr_concat1.concat(arr_concat2, {id: 5, name: "Sila"}));
    
    //INDEXOF - вернёт индекс искомого элемента, INCLUDES - вернёт тру или фолс

    // отличие между ними в том что инклюдс правильно обрабатывает нан
    const arr_indexof: number[] = [1,2,3,4,5,6,7,8,9,10]
    const idx: number = arr_indexof.indexOf(3)
    
    // MAP
    


    return (
        <>
            
        </>
    )
}

export default memo(Methods)