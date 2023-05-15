import { memo } from 'react'

const Context = () => {

    function hello(): void {
        console.log('Hello');
        
    }

    //this указывает на тот объект, в контексте которого оно было вызвано
    //изначально this - это глобальный объект window
    //получаем то что стоит слева до точки : person.hello

    // ПРИМЕР BIND

    const person = {
        name: 'Hui',
        msg: "Hello vay",
        sayHello: hello,
        sayHelloWindow: hello.bind(window), // забайндили функцию на объект виндов
        logInfo: function (job: any, phone: any) {
            console.group(`${this.name} info:`)
            console.log(`Name is ${this.name}`);
            console.log(`Job is ${job}`);
            console.log(`Phone is ${phone}`);
            console.groupEnd()
        }
    }

    const lena = {
        name: "Lena"
    }

    person.logInfo.bind(lena, "frontend", '9876')() // теперь метод принимает Lena. в функцию передали другие параметры

    //пример call - тоже как bind, только не вызываем как функцию

    const andrey = {
        name: 'Andre'
    }

    person.logInfo.call(andrey, "backend", '0089')

    //пример apply - тоже самое, только второй параметр это массив аргументов

    const padre = {
        name: "Pavel"
    }

    person.logInfo.apply(padre, ["devops", '2134'])

    //call and apply отличаются ТОЛЬКО способом передачи параметров в функцию

    /*                               

    const array: number[] = [1,2,3,4,5]

    Array.prototype.multBy(function(n) {
        return this.map(function(i) {
            return i*n;
        })
    }) пример реализации контекста this в prototype

    */

    return (
        <>
            cs
        </>
    )
}

export default memo(Context)