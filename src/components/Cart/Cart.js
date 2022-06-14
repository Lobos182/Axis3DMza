import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext'
import "./Cart.css"

const Cart = () => {

    const { cart, removeItem, removeAllItem,totalCompra } = useContext(CartContext)
    
    useEffect(() => {
        document.querySelectorAll('.button').forEach(button => button.addEventListener('click', e => {
            if (!button.classList.contains('delete')) {
                button.classList.add('delete');
                setTimeout(() => button.classList.remove('delete'), 3200);
            }
            e.preventDefault();
        }));
    })


    return (

        <div className='cartContainer'>
            {cart.length === 0 ?
                <><h1>Carrito Vacio</h1><div>
                    <Link className='Link' to="/">
                        <button className='finaliza'>Ir a Productos</button>
                    </Link>
                </div></>


                :
                <><h1>Carrito</h1><button class="button" onClick={removeAllItem}>
                    <div class="trash">
                        <div class="top">
                            <div class="paper"></div>
                        </div>
                        <div class="box"></div>
                        <div class="check">
                            <svg viewBox="0 0 8 6">
                                <polyline points="1 3.4 2.71428571 5 7 1"></polyline>
                            </svg>
                        </div>
                    </div>
                    <span>Vaciar carrito</span>
                </button><table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>cantidad</th>
                                <th>Precio por unidad</th>
                                <th>Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        {cart.map(prod => {
                            return (

                                <tbody key={prod.id}>
                                    <tr>
                                        <th>{prod.nombre}</th>
                                        <th>{prod.count}</th>
                                        <th>$ {prod.precio}</th>
                                        <th>$ {prod.precio * prod.count}</th>
                                        <th><section onClick={() => removeItem(prod.id)}>
                                            <span class="trash2">
                                                <span></span>
                                                <i></i>
                                            </span>
                                        </section>
                                        </th>
                                    </tr>

                                </tbody>

                            )
                        }
                        )}
                        <tfoot>
                            <tr>
                                <th>

                                </th>
                                <th>

                                </th>
                                <th>
                                    Total
                                </th>
                                <th>
                                   $ {totalCompra}
                                </th>
                            </tr>
                        </tfoot>
                    </table><div>
                        <button className='finaliza'>Finalizar compra</button>
                    </div></>}


        </div >
    )
}

export default Cart