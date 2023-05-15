import { memo } from 'react'

const Types = () => {

    /*          void - функция ничего не возвращает            */

    function logId(id: number | string): void {
        console.log(id);
    }
    const a = logId(3) // значение void пришло

    function m(f: number, s?: number) {
        if (!s) {
            return f * f
        }
        return f * s
    }

    type voidFunc = () => void; // тип для функции которая вернёт void
    const f1: voidFunc = () => {

    }
    const f2: voidFunc = () => {
        return true
    }
    const b = f2() //присвоится void, но значение будет равно true
    // практическое применение - типизировать функции перебора массивов, возврат void если ничего не возвращаем

    const skills: string[] = ['Dev', 'Devops', 'Frontend']
    const user = {
        s: ['s']
    }
    skills.forEach((skill) => user.s.push(skill))

    /*          unknown - не знаем, что лежит в переменной            */

    let input: unknown;

    input = 3
    input = ['s', 'str']

    let res: any = input
    

    // на практике unknown в try / catch

    async function getData () {
        try {
            await fetch('');
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err.message);
            } // проверка на unknown
        }
    }

    type u1 = unknown | number // u1 всегда будет unknown
    type i2 = unknown & number // u2 будет number, в intersection всегда так

    /*          never - никогда такого не произойдёт            */

    function generateErr(message: string): never {
        throw new Error(message)
    } // никогда ничего не вернётся
    
    // присвоить что либо к never нельзя. к void можно

    enum PaymentAction {
        Refund = 'refund',
        Checkout = 'checkout',
    }
    function payment(action: PaymentAction) {
        switch(action) {
            case PaymentAction.Refund:
                //...
                break;
            case PaymentAction.Checkout:
                //...
                break;
            default:
                const _:never = action
                throw new Error('Нет такого action')
                // если в энамс добавится очередной action, то ошибку мы получим сразу
        }
    } // пример с проверкой на наличие action

    function isString (str: string | number): boolean {
        if (typeof str === 'string') {
            return true
        } else if (typeof str === 'number') {
            return false
        }
        generateErr('aboba') // ветка с never. обрабатывает ошибку
    }

    //never помогает ограничивать какие-то ветки, когда мы должны...
    //...проходить явную проверку по типам, и блокировать какую-то ветку насовсем

    /*          null - если осознанно хотим вернуть, что данного оьъекта нет            */


    interface IUser {
        name: string
    }

    function getUser() {
        if (Math.random() > 0.5) {
            return null;
        } else {
            return {
                name: 'Вася'
            } as IUser
        }
    } // закастили return

    const usa = getUser()
    if (usa) {
        const usaName = usa?.name
        console.log(usaName);
    }
    
    return (
        <>
            tps
        </>
    )
}

export default memo(Types)