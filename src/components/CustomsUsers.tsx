import { memo } from 'react'
import { useCustomsUsers } from '../hooks/customsUsers'

const CustomsUsers = () => {

    const { customsUsers, isError, loading } = useCustomsUsers()

    console.log(customsUsers, isError, loading)

    return (
        <>
            {
                isError
            ?
                <h3>{isError}</h3>
            :
                <>
                    {
                        loading
                    ?
                        <h3>Loading...</h3>
                    :
                        <div style = {{display: 'flex', width: '850px'}}>
                        {
                           customsUsers?.map((item, index) => {
                            return (
                                <h3 key = {index + 2}>
                                   {item.name}     
                                </h3>
                            )
                           }) 
                        }
                        </div>
                    }
                </>
            }
        </>
    )
}

export default memo(CustomsUsers)