import React, { useState, useContext } from 'react'
import ItemCount from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';

const ItemDetail = ({ id, nombre, precio, imagen, stock }) => {

    const [quantity, setQuantity] = useState(0)


    const { addItem, getProductQuantity } = useContext(CartContext)

    const initialValue = getProductQuantity(id)

    const OnAdd = (count) => {
        console.log('Agregue al carrito')
        console.log(count)
        setQuantity(count)
        addItem({ id, nombre, precio, count })

    }
    return (
        <div>
            <div className="row">
                <div className="column">
                    <div className="card">
                        <img className='imgCard' src={imagen} alt='imagen card' />
                        <h3>{nombre}</h3>
                        <p>$ {precio}</p>
                        {quantity > 0 ? <Link to='/cart'>
                            <button>
                                Finalizar compra
                            </button>
                        </Link> : <ItemCount stock={stock} onConfirm={OnAdd} initial={initialValue} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail