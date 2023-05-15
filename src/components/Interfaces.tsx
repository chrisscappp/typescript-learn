import { memo } from 'react'

const Interfaces = () => {

    interface User {
        name: string,
        age: number,
        id: number
    }

    interface Role {
        role: string,
        roleId: number
    }

    interface UserWithRole extends User, Role {
        createdAt: Date
    }

    const user: UserWithRole = {
        name: 'Виталий Леопардович',
        age: 22,
        id: 100,
        role: 'admin',
        roleId: 33,
        createdAt: new Date()
    }

    console.log(user);

    type ICat = {
        name: string,
        sayHi: () => void
    }

    let cat: ICat = {
        name: "МУрзик",
        sayHi () {
            console.log(`Я ${this.name}`);
        }
    }

    setTimeout(cat.sayHi, 1000)

    interface test {
        name: string
    }

    interface test {
        age: number
    }

    let test1: test = {
        name: 'asd',
        age: 33
    } // два инта замержились в один общий

    /*
        Отличие type от interface в том, что интерфейсы можно мержить между собой. 
        Но это как полезно так и нет. 
        Вред если пишем интерфейс, который потом доопределяем. 
        Полезно когда используем какую либо библиотеку и нам нужно... 
        ...вместо екстенда доопределить тип.
        Type нельзя мержить. Первое отличие.
        Преимущество type - можем делать unioin и intersection: string | number...
        ...string & number.
        type - примитив.
        Рекомендации: type - для примитивных типов и intersection + union.
        Работа с объектами - interface
    */
    
    return (
        <>
        </>
    )
}

export default memo(Interfaces)