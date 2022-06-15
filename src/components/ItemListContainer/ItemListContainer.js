import './ItemListContainer.css'
import { useState, useEffect } from 'react'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../../services/firebase'



const ItemListContainer = ({ greeting }) => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const { categoriaId } = useParams()



  useEffect(() => {

    setLoading(true)
    const collectionRef = categoriaId
      ? query(collection(db, 'products'), where('categoria', '==', categoriaId))
      : collection(db, 'products')

    getDocs(collectionRef).then(response => {

      const products = response.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })

      setProducts(products)
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      setLoading(false)
    })
  }, [categoriaId])

  if (loading) {
    return <div className="spinner"></div>
  }

  return (
    <div className='ItemListContainer'>
      <h1>{greeting}</h1>
      <div className="row">
        <ItemList products={products} />
      </div>
    </div>
  )
}

export default ItemListContainer

