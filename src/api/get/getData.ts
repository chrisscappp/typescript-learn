import axios from 'axios'

export const getData = <T>(url: string): Promise<T> => {
    const a = new Promise<T>((resolve, reject) => {
        axios.get(url)
            .then((res: any) => {
                resolve(res.data)
            })
            .catch((err: unknown) => {
                reject(err)
            })
    })
    return a;
}

export const testGetData = async <T>(url: string): Promise<T> => {
    const res = await axios.get<T>(url)
    return res.data
}