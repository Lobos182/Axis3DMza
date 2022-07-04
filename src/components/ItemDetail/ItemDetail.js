import React, { useState, useContext } from 'react'
import ItemCount from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import './ItemDetail.css'

const ItemDetail = ({ id, nombre,descripcion, precio, imagen, stock }) => {

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
        <div className='containerItemDetail'>
            <div className="column">
                <div className="card">
                    <img className='imgCard' src={imagen} alt='imagen card' />
                    <h3>{nombre}</h3>
                    <p>{descripcion}</p>
                    <h3>$ {precio}</h3>
                    {quantity > 0 ? <Link to='/cart'>
                        <button className='botonCompra'>
                            Finalizar compra
                        </button>
                    </Link> : <ItemCount stock={stock} onConfirm={OnAdd} initial={initialValue} />}
                </div>
            </div>
        </div>
    )
}

export default ItemDetail