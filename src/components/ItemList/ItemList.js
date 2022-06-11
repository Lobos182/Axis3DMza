import React from 'react'
import Item from '../Item/Item'

const ItemList = ({products}) => {
  return (
    <div>
        {products.map(product => <Item key={product.id} {...product} />)}

    </div>

  )
}

export default ItemList