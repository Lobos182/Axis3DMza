import "./ItemDetailContainer.css"
import { useEffect, useState } from "react"
import { getProductsById } from "../../asyncmock"
import ItemDetail from "../ItemDetail/ItemDetail"
import { useParams } from "react-router-dom"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../../services/firebase"

const ItemDetailContainer = () => {
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)

    const { productoId } = useParams()

    useEffect(() => {
        setLoading(true)
        getDoc(doc(db, 'products', productoId)).then(response => {
            console.log(response)
            const product = { id: response.id, ...response.data() }
            setProduct(product)
        }).catch(error=>{
            console.log(error)
        }).finally(()=>{
            setLoading(false)
        })
    }, [productoId])

    if (loading) {
        return <h1>Cargando...</h1>
    }

    return (
        <div className='ItemDetailContainer'>
            <h2>Detalle producto</h2>
            <div className="row">
                <ItemDetail {...product} />
            </div>
        </div>
    )
}

export default ItemDetailContainer