import "./ItemDetailContainer.css"
import ItemDetail from "../ItemDetail/ItemDetail"
import { useParams } from "react-router-dom"
import { getProduct } from "../../services/firebase/firestore"
import { useFirestore } from "../../hooks/useFirestore"

const ItemDetailContainer = () => {    
    const { productoId } = useParams()
    const { isLoading, data, error } = useFirestore(() => getProduct(productoId), [productoId])
   
    if (isLoading) {
        return <h1>Cargando...</h1>
    }
    if (error) {
        return <h1>Ah ocurrido un ERROR...</h1>
    }

    return (
        <div className='ItemDetailContainer'>
            <h2>Detalle producto: {data.nombre}</h2>
            <div className="row">
                <ItemDetail {...data} />
            </div>
        </div>
    )
}

export default ItemDetailContainer