import { memo } from 'react'

const Tasks = () => {

    let number: number = 123;

    function makeNegative (num: number): number {
        if (num > 0) {
            return -num
        }
        return num
    } // сделать число отрицательным

    let text: string = "Крот боба";

    function remakeText (str: string) {
        let wordArr = str.split(" ")
        
        wordArr.forEach((item) => {
            item[0].toUpperCase()
        })

        for (let i = 0; i < wordArr.length; i++) {
            wordArr[i][0].toUpperCase()
        }

        console.log(wordArr);
        
    }

    //console.log('hui', remakeText(text));

    /*           ФУНКЦИЯ ПЛАТЕЖА           */

    enum PaymentStatus {
        Success = 'success',
        Failed = 'failed'
    }
    
    interface IRequest {
        sum: number,
        balance: number
        from: string,
        to: string,
    }

    interface SuccessData extends IRequest {
        databaseId: number,
    }

    interface FailedData {
        errorMessage: string,
        errorCode: number,
        balance: number
    }

    interface IResponseSuccess {
        status: PaymentStatus.Success,
        data: SuccessData
    }

    interface IResponseFalied {
        status: PaymentStatus.Failed,
        data: FailedData
    }

    // в случае успеха - дата бэйс айди. неуспех - ошибка

    type Res = IResponseSuccess | IResponseFalied

    function isSuccess(res: Res): res is IResponseSuccess {
        if (res.status === PaymentStatus.Success) {
            return true;
        }
        return false;
    }

    function getDataBaseId (res: Res): number {
        if (isSuccess(res)) {
            return res.data.databaseId
        } else {
            throw new Error(res.data.errorMessage)
        }
    }

    function makePayment (res: IRequest): IResponseSuccess | IResponseFalied  {
        if (res.sum <= res.balance) {
            res.balance -= res.sum
            const sucRes: IResponseSuccess = {
                status: PaymentStatus.Success,
                data: {
                    databaseId: 567,
                    sum: res.sum,
                    balance: res.balance,
	                from: res.from,
	                to: res.to
                }
            }
            return sucRes
        } else {
            const failRes: IResponseFalied = {
                status: PaymentStatus.Failed,
                data: {
                    errorMessage: "Недостаточно средств",
                    errorCode: 4,
                    balance: res.balance
                }
            }
            return failRes
        }
    }

    const response: IRequest = {
        sum: 10000,
        balance: 15000,
	    from: "Артемий Татьянович",
	    to: "Виталию Леопардовичу"
    }

    const payment = makePayment(response)

    /*________________________________________*/

    class Product {
        constructor(
            public id: number,
            public title: string,
            public price: number
        ) { }
    } // такой синтаксис задает объект с полями. можем его создать

    class Delivery {
        constructor(
            public date: Date
        ) {}
    }

    class HomeDelivery extends Delivery {
        constructor(public date: Date, public adress: string) {
            super(date)
        }
    } // унаследовали вид доставки от основной доставки, и задали поля для новой

    class IssueDelivery extends Delivery {
        constructor(public shopId: number) {
            super(new Date())
        }
    }

    type DeliveryOptions = HomeDelivery | IssueDelivery;

    class Cart {
        private products: Product[] = [];
        private delivery!: DeliveryOptions;

        public getCartInfo() {
            console.log(this.products);
            console.log(this.delivery);
        }

        public addProduct(p: Product): void {
            this.products.push(p)
        }
        
        public deleteProduct(productId: number): void {
            this.products = this.products.filter(p => p.id != productId)
        }

        public sumPrice(): number {
            return this.products
                .map((p: Product) => p.price)
                .reduce((sum: number, current: number) => sum + current)
        }

        public setDelivery(delivery: DeliveryOptions) {
            this.delivery = delivery
        }

        public checkout() {
            if (this.products.length === 0) {
                throw new Error("Корзина пуста...")
            }
            if (typeof this.delivery === 'undefined') {
                throw new Error("Параметры доставки не заданы...")
            }
            console.log("Всё окей! Можем доставить товар!");
            
        }
    }

    const cart = new Cart()
    cart.addProduct(new Product(1, 'Печенье', 228))
    cart.setDelivery(new IssueDelivery(4))
    cart.getCartInfo()
    cart.checkout()

    function toString<T>(data: T): string {
        
        if (Array.isArray(data) || typeof data === 'function') {
            return data.toString()
        }

        if (typeof data === 'object') {
            return JSON.stringify(data)
        }

        if (typeof data === 'string') {
            return data;
        }
        
        return String(data);
        
    }

    const c = toString<number[]>([1,2,3,4])
    //console.log(c)

    interface IUser {
        id: number;
        name: string
    }

    const users: IUser[] = [
        {id: 3, name: 'krot'},
        {id: 5, name: 'borsh'},
        {id: 1, name: 'arararar'},
    ]

    function sortById<T extends IUser>(data: T[], sortType: 'abc' | 'cba' = 'abc'): T[] {
        if (sortType === 'abc') {
            return data.sort((prev, next) => prev.id - next.id)
        } else {
            return data.sort((prev, next) => next.id - prev.id)
        }
    }

    const tst = sortById(users, 'cba')   
    //console.log(tst) 

    interface IData {
        group: number;
        name: string;
        course?: number;
    }

    const data: IData[] = [
        { group: 1, name: 'a', course: 3 },
        { group: 1, name: 'b' },
        { group: 2, name: 'c' },
        //{ group: 2, name: 'd', course: 4 },
        //{ group: 3, name: 'f' }
    ]

    interface IGroup<T> {
        [key: string]: T[];
    }

    type Key = string | number | symbol;

    function grouping<T extends Record<Key, any>>(arr: T[], key: keyof T): IGroup<T> {
        let obj: IGroup<T> = {};
        arr.map((i: T) => {
            if (key in i) {
                let gkey: string = i[key];
                obj[gkey] = [];
                arr.map((j: T) => {
                if (j[key] == gkey) {
                    obj[gkey].push(j);
                }
            })
            }
            
        })
        return obj;
    }

    const res = grouping(data, 'group')
    console.log(res)

    const roles = [
        {title: 'admin', roleId: 101},
        {title: 'user', roleId: 202},
        {title: 'moderator', roleId: 303},
    ] as const

    type RoleType = typeof roles[number]

    interface IUserWIthRole extends IUser {
        role: RoleType;
    }

    interface ISuperUser extends IUser {
        super: 'superrr';
    }

    const usr: IUserWIthRole = {
        id: 12,
        name: "Bobro",
        role: {
            title: 'admin',
            roleId: 101
        }
    }

    const usr2: ISuperUser = {
        id: 12,
        name: "Bobro",
        super: 'superrr'
    }

    const usr3: IUserWIthRole = {
        id: 12,
        name: "Bobro",
        role: {
            title: 'user',
            roleId: 202
        }
    }

    type UserId = IUserWIthRole['id'] // number
    type UserRoleId = IUserWIthRole['role']['roleId'] // union in 101 202...

    function isSuperUser(us: IUserWIthRole | ISuperUser): us is ISuperUser {
        return 'super' in us; 
    }

    function isAdmin(us: IUserWIthRole): us is IUserWIthRole {
        return (us as IUserWIthRole).role.roleId === 101
    }

    

    return (
        <>
            {
                payment.status === PaymentStatus.Success
            ?
                <>
                    <h3>Платёж на сумму {payment.data.sum} отправлен {payment.data.to}. Успешно!</h3>
                    <h3>Баланс карты - {payment.data.balance}</h3>
                </>
            :
                <>
                    <h3>Ошибка. {payment.data.errorMessage} :(</h3>
                    <h3>Баланс карты: {payment.data.balance}</h3>
                </>
            }
        </>
    )
}

export default memo(Tasks)