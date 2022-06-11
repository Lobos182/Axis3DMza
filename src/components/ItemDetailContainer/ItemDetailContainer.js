import { useEffect, useState } from "react"
import { getProductsById } from "../../asyncmock"
import ItemDetail from "../ItemDetail/ItemDetail"
import { useParams } from "react-router-dom"

const ItemDetailContainer = () => {
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)

    const { productoId } = useParams()

    useEffect(() => {
        getProductsById(productoId).then(res => {
            setProduct(res)
        }).finally(()=>{
            setLoading(false)
        })
    }, [productoId])

    if(loading){
        return <h1>Cargando...</h1>
    }

    return (
        <div className='ItemDetailContainer'>
            <ItemDetail {...product} />
        </div>
    )
}

export default ItemDetailContainer