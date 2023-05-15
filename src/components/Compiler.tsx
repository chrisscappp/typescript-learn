const Compiler = () => {

    /*
    
        Внутри tsconfig.json:

        "compilerOptions": {...}, (
            allowJs - js файлы - это файлы нашего приложения...
            ...будут собраны вместе с ts
        )
        "files": ["app.tsx"], - массив файлов, которые будут скомпилированны
        "include": ["app*"], - тоже самое, только с паттернами
        "exclude": ["test*"], - исключаем из компилляции
        "extends": "../../../" - путь до tsconfig который extendит данный конфиг.
        ...параметры в исходном дополняются или переопределяются тем, который укажем

        emit./ourDir - поместит скомпилированные файлы с той же сигнатурой в опред папку
        noEmitOnError - ошибка -> компилировать не будем
        importNotUsedAsValue - удаление типов, которые импортируем, но не используем
        sourceMap - связывают ts с js файлами. файл ***.js.map - отлаживают ошибки ts файлов 
        inlineSourceMap - тоже самое только внутри файла
        sourceRoot / mapRoot - указываем где искать source-map-ы
        declare - описание чего-либо с использованием ts. файлы d.ts
        emitDeclareOnly - импорт структуры с точки зрения ts. в build только js/d.ts
        declarationDir - директория куда складываем "types"


        !  Language and Environment  !


        target - стандарт компиляции
        lib - апишка проекта. что будет подключено (console, math, window. подключить полифил)
        jsx - настройки для реакта и декораторов

        
        Модульность:


        module - с помощью чего компилируем (commonjs(back), es6, esnext(front))
        rootdir - директория, где находится весь проект (папка src)
        baseurl - базовый путь для ресолва модулей
        types - дополняющие типы
        resolvejsonmodule - импорт JSON в TS и преобразование его автоматически в объекты

        scrict - строгий режим для ts, который и задаёт всю строгость этого языка


    */

    return (
        <>
            Complier
        </>
    )
}

export default Compiler