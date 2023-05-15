const TypeManipulation = () => {

    /*        KEYOF - вытащить ключи из класса или объекта        */

    interface IUser {
        id: number;
        name: string;
        age: number;
        adress?: string;
    }

    const user: IUser = {
        id: 12,
        name: 'Bob',
        age: 30
    }

    function getValue<T, K extends keyof T>(data: T, key: K) {
        return data[key];
    }

    const rs = getValue(user, 'id')

    /*        TYPEOF - сузить тип, привести к типу        */


    // Связка keyof typeof ... - вытащить ключи из ТИПА

    let p: string | number;

    if (Math.random() > 0.5) {
        p = 5
    } else {
        p = 'boba'
    }

    if (typeof p === 'string') {
        console.log(`${p} is string`)
    } else {
        console.log(`${p} is number`)
    } // сузили тип

    let p2: typeof p; // р2 стала типа р

    const usr: IUser = {
        name: 'Boba',
        id: 12,
        age: 30,
        adress: 'buh'
    }

    type Keys = keyof typeof usr

    function getvl<T extends Record<string, any>>(obj: T, key: Keys) {
        return obj[key];
    }

    const rs2 = getvl<IUser>(usr, 'adress')
    console.log(rs2)


    /*        Обращение по индексу в типах        */


    interface Role {
        role: string;
        roleId: number;
    }

    interface Permission {
        dueDate: Date;
    }

    interface INewUser {
        id: number;
        name: string;
        roles: Role[];
        permission: Permission;
    }

    const newUser: INewUser = {
        id: 12,
        name: "Bobro",
        roles: [],
        permission: {
            dueDate: new Date()
        }
    }

    const usrId = newUser['id']

    // а как получить тип ролей пользователя?

    const roleNames = 'roles'
    let idName: 'id' = 'id'

    type NameType = INewUser['name'] // vot tak
    type RoleType = INewUser[typeof roleNames][number] // обратились к массиву ролей и тип роли по индексу
    type IdType = INewUser[typeof idName] 

    const roles = ['admin', 'user', 'super-user'] as const //кастанули массив ролей к массиву типов ролей

    type RoleType2 = typeof roles[number]; // когда есть перечесления в ран тайме и хотим явно преобразовать это в типы
    type DateType = INewUser['permission']['dueDate'] // вложенный



    /*        Conditional Types         */



    interface HTTPResponse<T extends 'success' | 'failed'> {
        id: number;
        data: T extends 'success' ? string : Error
    } // бич реализация. в зависимости от Т назначаем тип для поля

    //основной принцип - динамическая подстановка типа в зависимости от Т

    const res: HTTPResponse<'success'> = {
        id: 200,
        data: 'Response is success!'
    }

    // частый кейс такого использования - упрощение перегрузки

    class User {
        id!: number;
        name!: string;
    }

    class UserPersistend {
        dbId!: string;
    }

    function getUser(id: number): User;
    function getUser(dbId: string): UserPersistend;
    function getUser(idOr: string | number): User | UserPersistend {
        if (typeof idOr === 'string') {
            return new UserPersistend();
        } else {
            return new User();
        }
    }

    type ReturnUserType<T extends string | number> = T extends string ? UserPersistend : User;

    // обновляем
    function getUser2<T extends string | number>(id: T): ReturnUserType<T> {
        if (typeof id === 'number') {
            return new User() as ReturnUserType<T>;
        } else {
            return new UserPersistend as ReturnUserType<T>
        }
    }

    // таким образом исбаввили себя от перегрузки и сделали красиво
    const resp = getUser2('bob1838');
    console.log(resp)

    class ToHome {
        adress: string;
        constructor(adress: string) {
            this.adress = adress;
        }
    }

    class ToPunkt {
        punktId: number;
        constructor(punktId: number) {
            this.punktId = punktId
        }
    }

    type DeliveryType<T extends string | number> = T extends string ? ToHome: ToPunkt;  
    // в зависимости от типа Т вернём какой-то тип

    function setDelivery<T extends string | number>(delParam: T): DeliveryType<T> {
        if (typeof delParam === 'string') {
            return new ToHome(delParam) as DeliveryType<T>;
        } else {
            return new ToPunkt(delParam) as DeliveryType<T>; 
        }
    }

    const delivery = setDelivery(32)

    //console.log(delivery)

    /*  Infer  */

    function runTransaction(transaction: {
        fromTo: [string, string]
    }) {
        console.log(transaction)
    }

    const transaction: GetFirstArg<typeof runTransaction> = {
        fromTo: ['1', '2']
    } // фиксить ошибку кастом as [string, string]

    // или

    type GetFirstArg<T> = T extends (first: infer First, ...args: any[]) => any ? First : never

    // infer вытащил тип из First, и сделал его "глобальным"

    runTransaction(transaction)



    /*    Mapped Types - полезно, когда в объектах есть повторяющиеся ключи, но нужны уникальные значения   */



    type Modifier = 'read' | 'update' | 'create'

    type UserRoles = {
        customers?: Modifier,
        projects?: Modifier,
        adminPanel?: Modifier
    } 

    type UserAccess1 = {
        customers?: boolean,
        projects?: boolean,
        adminPanel?: boolean
    } // наивная реализация - свойства могут добавляться

    // правильно так:

    type ModifierToAccess<T> = {
        +readonly [Property in keyof T as Exclude<`canAccess${string & Property}`, 'canAccessadminPanel'>]-?: boolean;
    }   // -? убирает ?

    type UserAccess2 = ModifierToAccess<UserRoles>

    // exclude - генерик исключает то что передали вторым параметром из типа что лежит в первом

    interface IForm {
        name: string;
        password: string;
        email: string;
    }

    const form: IForm = {
        name: "Krot",
        password: "123",
        email: ''
    }

    type ValidItem = {
        isValid: boolean;
        errorMessage?: string;
    }

    type FormValidAccess2<T> = {
        +readonly [Property in keyof T]: ValidItem;
    }

    type test = FormValidAccess2<IForm>

    const formValidation: test = {
        name: { isValid: true },
        password: { isValid: false, errorMessage: "Длина пароля больше 5 символов" },
        email: { isValid: false, errorMessage: "Поле пустое" }
    }


    /*   LITEral types    */


    type ReadOrWrite = 'read' | 'write'
    type JSON = 'JSON' | ''

    type Access = `can${Capitalize<ReadOrWrite>}${Uppercase<JSON>}`

    type NoCan<T> = T extends `can${infer R}` ? R : never // обратная распаковка
    type Test = NoCan<Access> // вытащили типы без can

    return (
        <>
            TypeManipulation
        </>
    )
}

export default TypeManipulation