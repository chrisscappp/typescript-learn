const Generics = () => {

    /*
        Generics - основа для легкопереиспользуемого кода, с одними и те же типами.
        Резерв места для типа, подставить в рамках вызова конкретный тип для реализации
        
        <T> - пример генерика. динамический тип, с точки зрения ф-ии, но переиспользуемые в коде.

        Ограниченные генерики - имба!

        Generics как бы управляет тем типом что внутри объекта.
        Это доп инфа, которую по другому никак не передать, кроме как генерик
    */

    
    /*        Встроенные generics        */


    const num: Array<number> = [1,2,3,4,5] // массив, но уточнили, что массив чисел

    async function test() {
        const a = new Promise<number>((resolve, reject) => {
            resolve(1)
        }) // тип число
    }

    const check: Record<string, boolean> = {
        drive: true,
        kpp: false
    } // тип string - для ключа ; boolean - значения


    interface IUser {
        id: number,
        name: string
    }

    function logMiddleware<T>(data: T): T {
        //console.log(data);
        return data;
    } // шаблон функции для всех типов. тип зададим когда будем получать значение

    const a = logMiddleware<IUser>({id: 2, name: 'kort'}) // получаем значение и явно указываем его тип
    
    function getSplitedHalf<T>(data: Array<T>): Array<T> {
        const l = data.length / 2;
        return data.splice(0, l)
    } // аналогично первой функции. шаблон...

    const split: <T>(data: Array<T>) => Array<T> = getSplitedHalf; // сделали типизацию ф-ии
    const b = getSplitedHalf<number>([1,2,3,4])
    //console.log(b)

    interface IUserGeneric<T> {
        id: number;
        name: string;
        data: T;
    } // шаблон T - любой тип туда. он будет в data

    interface IData {
        headers: {
            ip: string,
            host: string
        },
        registerDate: Date
    }

    const user: IUserGeneric<IData> = {
        id: 1,
        name: 'Krot',
        data: {
            headers: {
                ip: '12.424.789',
                host: '3000'
            },
            registerDate: new Date()
        }
    }


    /*        Ограниченные generics        */


    // мы не можем работать с generics как с типом, и использовать какие-то его св-ва

    class Vehicle {
        run: number = 100;
    }

    function kmToMiles<T extends Vehicle>(vehicle: T): T { // пофиксили, унаследовав типизацию у класса
        vehicle.run /= 0.62; // проблема. св-во run не существует в типе T
        return vehicle;
    }

    const vehicle = kmToMiles(new Vehicle())
    const teest = kmToMiles({run: 120}) // ошибки нет, тк по сигнатуре объект такой же как и класс


    function logId<T extends string | number>(id: T): T {
        return id;
    }  // сузили тип генерика, указав те, которые возможны при получении

    
    /*        generics в классах        */


    class Resp<D, E> {
        data?: D;
        error?: E;

        constructor(data?: D, error?: E) {
            if (data) {
                this.data = data;
            }
            
            if (error) {
                this.error = error;
            }
        }
    } // генерики как в ф-иях. просто передать типы

    const resp = new Resp<string, number>('I Data!', 200);
    
    class HTTPResp extends Resp<string, number> {
        public _code!: number; 
        
        set code (c: number) {
            this._code = c;
        }
    } // если наследуемся от класса с генериком, то обязательно надо передать типы


    const resp2 = new HTTPResp()

    interface IResp {
        code: 200 | 404;
        data?: any;
        error?: string;
        status: 'pending' | 'resolve' | 'reject'
    }

    

    

    /*
    
    генерик в классах полезен:
    есть универсальная верхняя часть объекта, 
    а внутри переменные поля, зависящие от реализации - результата

    */


    /* 

        mixins - для тестов и моделей наследования. наследование от нескольких классов       
    
    */

    type Constructor<T = {}> = new (...args: any[]) => T; //конструктор для миксина

    class Fish {
        swim() {
            console.log('swim')
        }
    }

    class Dog  {
        bark() {
            console.log('bark')
        }
    }

    type DogType = Constructor<Dog>;
    type FishType = Constructor<Fish>;
    type test = DogType | FishType

    function Animal<T extends test>(Base: T) {
        return class Animal extends Base {
            _name: string = '';
            set name(name) {
                this._name = name
            }

            get name(): string {
                return this._name
            }
        } 
    } // объединили класс в функции с тем, что передали аргументом и вернули новый

    const fishWithAnimal = Animal(Fish)
    const myFish = new fishWithAnimal();


    return (
        <>
            Generics
        </>
    )
}

export default Generics