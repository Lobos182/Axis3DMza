import './ItemListContainer.css'
import { useState, useEffect } from 'react'
import { getProducts, getProductsByCategory } from '../../asyncmock'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'


const ItemListContainer = ({ greeting }) => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const { categoriaId } = useParams()



  useEffect(() => {
    if (!categoriaId) {
      getProducts().then(response => {
        setProducts(response)
      }).finally(()=>{
        setLoading(false)})
    } else {
      getProductsByCategory(categoriaId).then(response => {
        setProducts(response)
      }).finally(()=>{
        setLoading(false)})
    }

  }, [categoriaId])

  if(loading){
    return <h1>Cargando........</h1>
}

  return (
    <div className='ItemListContainer'>
      <h1>{greeting}</h1>
      <ItemList products={products} />

    </div>
  )
}

export default ItemListContainer

