import './ItemListContainer.css'
import ItemList from '../ItemList/ItemList'
import { useFirestore } from '../../hooks/useFirestore'
import { useParams } from 'react-router-dom'
import { getProductsByCategory } from '../../services/firebase/firestore'

const ItemListContainer = ({ greeting }) => {  
  const { categoriaId } = useParams()
  const { isLoading, data, error } = useFirestore(() => getProductsByCategory(categoriaId), [categoriaId])

  if (isLoading) {
    return <div className="spinner"></div>
  }
  if (error) {
    return <h1>Ha ocurrido un Error</h1>
  }

  return (
    <div className='ItemListContainer'>
      <div className='contendorimg'>
        <img src='/images/fondo.jpg' alt='Fondo'/>
        <h1 className='centrado'>{greeting}</h1>
      </div>
      
      <div className="row">
        <ItemList products={data} />
      </div>
    </div>
  )
}

export default ItemListContainer

