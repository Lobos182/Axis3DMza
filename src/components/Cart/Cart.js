import React, { useContext } from 'react'
import CartContext from '../../context/CartContext'

const Cart = () => {

    const { cart, removeItem, removeAllItem } = useContext(CartContext)


    return (
        <div>
            <h1>Carrito</h1>
            <div>
                <div>
                <button onClick={removeAllItem}>borrar carrito</button>
                </div>
                {cart.map(prod => {
                    return (
                        <div>
                            <div key={prod.id} style={{ display: 'flex' }}>
                                <div>{prod.nombre}</div>
                                <div>Cantidad: {prod.count}</div>
                                <div>PrecioxUnidad: ${prod.precio}</div>
                                <div>subtotal: ${prod.precio * prod.count}</div>
                                <button onClick={() => removeItem(prod.id)}>X</button>
                                
                            </div>
                        </div>
                    )
                }
                )
                }

            </div>
        </div>
    )
}

export default Cart