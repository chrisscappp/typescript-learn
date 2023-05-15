const ServiceTypes = () => {

    /*   PARTIAL REQUIRED READONLY - для объектов   */

    interface IUser {
        name: string;
        age?: number;
        email?: string;
    }

    type partial = Partial<IUser> // делает все поля типа необязательными
    const p: partial = {} // аккуратно! валидная запись...

    type req = Required<IUser> // делает поля обязательными
    //const r: req = {}

    type read = Readonly<IUser> // поля только для чтения
    type combo = Readonly<Required<IUser>>

    // под капотом mapped types по ключам объекта



    /*   PICK OMIT EXTRACT EXCLUDE   */


    interface PaymentPersistent {
        id: number;
        sum: number;
        from: string;
        to: string;
    }

    type CustPick<T, K extends keyof T> = {
        [P in K]: T[P]
    }

    type CustOmit<T, K extends keyof any> = CustPick<T, Exclude<keyof T, K>>

    type Payment = CustOmit<PaymentPersistent, 'id' | 'to'> // исключает ключи из типа
    type Requisits = CustPick<PaymentPersistent, 'from' | 'to'> // берёт из типа нужные ключи

    type CastExtract<T, U> = T extends U ? T : never
    type CastExclude<T, U> = T extends U ? never : T 

    type ExtractEx = CastExtract<'from' | 'sum' | Payment, string> // вытащить из типа только те типы, которые являются строками
    type ExcludeEx = CastExclude<'from' | 'to' | Payment, string> // исключили все строки. остался пэймент



    /*     RETURNTYPES, PARAMS, CONSTRPARAMS, AWAITED     */


    class User {
        constructor(public id: number, public name: string) {

        }
    }

    function getUser(id: number): User {
        return new User(id, 'Vasya');
    }

    type RT = ReturnType<typeof getUser> // получили тип того, что вернёт ф-ия

    type PT = Parameters<typeof getUser>; // кортеж параметров ф-ии с типами
    type firstParam = PT[0];

    type GT = ReturnType<<T extends object>() => T> // без object -> unknown
    type CP = ConstructorParameters<typeof User> // типы параметров User

    type A1 = Awaited<Promise<Promise<string>>> // вытащили стринг из цепочки промисов


    interface IMenu {
        name: string,
        url: string
    }

    async function getMenu(): Promise<IMenu[]> {
        return [{name: 'Analitika', url: 'analythics'}]
    }

    type FT = Awaited<ReturnType<typeof getMenu>> // вытащили массив IMenu

    async function getArray<T>(x: T): Promise<Awaited<T[]>> {
        return [await x];
    } // более полная типизация

    type FT2 = Awaited<ReturnType<typeof getArray>>

    return (
        <>
            ServiceTypes
            
        </>
    )
}

export default ServiceTypes