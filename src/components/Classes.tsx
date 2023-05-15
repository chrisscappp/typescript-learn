import { memo } from 'react'

const Classes = () => {

    class User {
        name!: string;
        age!: number;
        skills: string[];

        constructor()
        constructor(name: string) // перегрузка конструктора
        constructor(age: number)
        constructor(ageOrName?: string | number, age?: number) {
            if (typeof ageOrName === 'string') {
                this.name = ageOrName;
            } else if (typeof ageOrName === 'number') {
                this.age = ageOrName
            }
            if (typeof age === 'number') {
                this.age = age
            }
            this.skills = []
        }

        setSkills(s: string): void // перегрузка setSkills 
        setSkills(s: string[]): void
        setSkills(s: string | string[]): void {
            if (typeof s === 'string') {
                this.skills.push(s)
            } else {
                this.skills = this.skills.concat(s)
            }
        }
    }

    class Admin {
        role!: number;
    } // без конструктора '!'

    const user = new User("Петро")
    const user2 = new User(33)

    const user3 = new User('Vasya')
    user3.age = 33
    user3.setSkills(['Backend', 'exr'])
    //console.log(user3);
    user3.setSkills('123')
    //console.log(user3);


    /* -------------------------------- */


    enum PaymentStatus {
        Holded,
        Processed,
        Reversed
    }

    class Payment {
        id!: number;
        status: PaymentStatus = PaymentStatus.Holded;
        createdAt: Date = new Date();
        updatedAt: Date = new Date();

        constructor(id: number) {
            this.id = id;
        }

        getPaymentLifeTime(): number {
            return new Date().getTime() - this.createdAt.getTime();
        } // метод получения времени, когда платёж был зарезервирован

        unholdPayment(): void {
            if (this.status == PaymentStatus.Processed) {
                throw new Error("Платёж не может быть возвращен!")
            }
            this.status = PaymentStatus.Reversed;
            this.updatedAt = new Date()
        }
    }

    const payment = new Payment(1)
    payment.unholdPayment()
    const time = payment.getPaymentLifeTime();


    /* -------------------------------- */


    class User3 {
        _login!: string;
        _password: string = '';

        set login(val) {
            this._login = 'user-' + val
        } // можно не типизировать аргумент, тк то что вовзращает геттер по типу = аргу

        get login() {
            return this._login
        }
    }

    // если сеттера нет - то логин readonly
    // геттеры и сеттеры не асинхронны
    
    const user4 = new User3()
    user4.login = 'aboba'
    //console.log(user4.login);


    /* -------------------------------- */


    interface ILogger {
        log(...args: any[]): void,
        error(...args: any[]): void
    }

    class Logger implements ILogger {
        log(...args: any[]): void {
            console.log(...args)
        }
        error(...args: any[]): void {
            throw new Error("Args is undefined")
        }
    }

    interface IPayble {
        pay(paymentId: number): void;
        price?: number;
    }

    interface IDeletable {
        delete(): void;
    }

    class UserPayble implements IPayble, IDeletable {
        pay(paymentId: number | string): void {
            console.log(`Pay ${this.price} with payment id = ${paymentId}`);
        }
        delete(): void {
           ///
        }
        price?: number | undefined;
    }

    /*
        Имплементация - своего рода типизация класса. В интерфейсе описываем методы,
        которые хотим видеть в классе. Все методы интерфейса должны быть и в классе.
        Используем когда хотим обязать класс носить такие свойства, или реализацию
        конкретного класса отделить от основного кода 
    */



    /* -------------------------------- */
    

    // Наследование юзать тогда, когда одна и та же сущность имеет несколько различных видов


    type PaymentSts = 'new' | 'paid'

    class Paymnt {
        id!: number;
        status: PaymentSts = 'new'

        constructor(id: number) {
            this.id = id;
        }

        pay() {
            this.status = 'paid'
        }
    }

    class PersistedPaymnt extends Paymnt {
        databaseId!: number;
        paidAt!: Date;

        constructor() {
            const id = Math.random()
            super(id); // вызов конструктора класса, от которого наследуемся
            // + передача в него значений для полей
        }

        override pay(date?: Date) {
            super.pay()
            if (date) {
                this.paidAt = date;
            }
        } // переопеределили метод pay, сделав date необязательным, тк у родителя мы ниче не принимаем
        // override - явно указали что переопределяем. избегаем ошибок
    }

    class PersistedPaymnt2 extends Paymnt {

        paidAt!: Date;
        payForId!: number;

        constructor() {
            const id = Math.floor(Math.random())
            super(id)
        }

        override pay(date?: Date, payForId?: number) {
            super.pay()
            if (payForId && date) {
                this.payForId = payForId
                this.paidAt = date
            }
        }
    }

    // super делает референс к классу от которого мы наследуемся

    const tesst = new PersistedPaymnt()
    //console.log(tesst.id); // = Math.random()

    const tessst = new PersistedPaymnt2()
    tessst.pay(new Date(), 123)
    //console.log(tessst.paidAt, tessst.payForId);
    
    
    /* -------------------------------- */


    class Usr {
        name!: string;

        constructor(name: string) {
            this.name = name;
        }
    }

    class UsersLists {
        users!: Usr[];

        push(u: User) {
            this.users.push(u)
        }
    } // пример композиции - выгоднее чем наследование

    class TestPayment {
        date!: Date;
    }

    class UserWithPayment {
        user!: Usr;
        payment!: TestPayment;

        constructor(user: Usr, payment: TestPayment) {
            this.user = user;
            this.payment = payment
        }
    } // композиция - типа "наследование". перенимает те же св-ва что и родитель
    // мы не меняем освновный класс. 


    /* -------------------------------- */


    class Car {
        _make!: string;
        private _demages!: string[];
        protected _run!: number;

        constructor(make: string) {
            this._make = make;
            this._demages = ['Pisun', 'aboba']
        }

        set addDamage(damage: string) {
            this._demages.push(damage)
        }

        get demages() {
            return this._demages;
        }
    }

    // private-наследуемые поля недоступны в дочернем компоненте
    // protected-наследуемые поля доступны...

    class EuroTrack extends Car {
        set run(n: number) {
            this._run = n / 0.62;
        }
        get run() {
            return this._run;
        }
        constructor(make: string) {
            super(make)
        }
    }

    const bmw = new Car('lada');
    //console.log(bmw.demages);
    bmw.addDamage = 'krot'
    //console.log(bmw.demages);

    const volvo = new EuroTrack('volvo')
    volvo.run = 1000
    //console.log(volvo.run);
    

    /* -------------------------------- */


    class UserService {
        
        private static db: any[] = [{id: 4, name: 'Hosha'}];

        static getUser(id: number) {
            return UserService.db.find(user => user.id === id)
        }

        create() {
            
        }

        static {
            UserService.db = [{id: 1, name: 'smeen'}]
        } // инициализирует код в момент создания
    } // у static нет конструктора
    
    UserService.getUser(4) // статик позволяет обращаться напрямую к обьекту класса и работать с ним как с объектом
    // только статические методы!!!


    /* -------------------------------- */


    /* 
        this - база контекст. ссылается на контекст текущего объекта

        Как не терять контекст? Bind, apply, call. Использовать стрелочную ф-ию...
        ...вместо обычной. НО. Стрелочный bind не работает в унаследованных классах...
        ...тк не считается ф-ей. но если заменить super на this - то будет работать...
        ...тк контекст внутри унаследованного класса - всё четко!

        Итог - использовать стрелочные, но быть аккуратным с наследованием. Либо...
        ...простые function, но делать .bind(...)
    */

    class PaymentContext {
        private date: Date = new Date();

        public getDate(this: PaymentContext) {
            return this.date
        } // указали, чтобы TS ругался на неправильный контекст

        public getDateArrow = () => {
            return this.date
        }
    }

    const p = new PaymentContext()

    const obj = {
        id: 4,
        paymentDate: p.getDate.bind(p),
        paymentDateArrow: p.getDateArrow
    }

    //console.log(p.getDate());
    //console.log(obj.paymentDate());
    //console.log(obj.paymentDateArrow());
    
    class PaymentContextPersistent extends PaymentContext {
        save() {
            return this.getDateArrow()
        } // super.getDate() | this.getDateArrow(). Потому что в контексте нового объекта
        // мы можем получить getDateArrow(), а в родителе нет!
    }

    //console.log(new PaymentContextPersistent().save())

    // типизация this выглядит так

    class UserBuilder {
        name!: string;

        setName(name: string): this {
            this.name = name;
            return this
        }

        isAdmin(): this is AdminBuilder {
            return this instanceof AdminBuilder
        } // typeguard для проверки типа класса
    } // у TS есть свой тип - this. иначе если возвращаем UserBuilder, то ошибка типизации

    class AdminBuilder extends UserBuilder {
        roles!: string[];
    }

    const res = new UserBuilder().setName('Vasya')
    const res2 = new AdminBuilder().setName('bomj')

    let us: UserBuilder | AdminBuilder = new UserBuilder() 

    if (us.isAdmin()) {
        //console.log(us);
    } else {
        //console.log(us);
    }


    /* -------------------------------- */


    abstract class Controller {
        abstract handle(req: any): void;

        handleWithLogs(req: any) {
            console.log('start');
            this.handle(req); // this вызовется у наследника!!!
            console.log('ends');
        }
    } // абстрактный класс с абстрактными методами, которые не имеем права не определить в наследнике

    class UserController extends Controller {
        handle(req: any): void {
            console.log(req);
        }
    }

    new UserController().handleWithLogs('req')

    abstract class AbsLogger {
        abstract log(message: string): void;
        
        public printDate(date: Date) {
            this.log(date.toString())
        }
    } // абстрактный класс

    class LoggerTask extends AbsLogger {
        log(message: string): void {
            console.log(message)
        }

        logWithDate(msg: string) {
            this.printDate(new Date())
            this.log(msg)
        }
    } 

    new LoggerTask().logWithDate('success')


    // нельзя инстанциировать new Controller() - error. только наследников
    // плюсы от имплементации в том, что можем описать логику каких-то методов

    


    return (
        <>
            classs
        </>
    )
}

export default memo(Classes)