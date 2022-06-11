import React from 'react'
import './CartWidget.css'
import '../ItemCount/ItemCount'
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import { Link } from 'react-router-dom';


const CartWidget = (props) => {

    const {getQuantity} = useContext(CartContext)
    const count = getQuantity()

    return (
        <div>                     
            <Link type="button"  to='/cart' className="d-flex">
                        <button className='btn-outline-dark'>
                            <i className='bi bi-cart4 me-2 icono'></i>                                                      
                            <span className='badge bg-dark text-white ms-2 rounded cantcarrito'>
                                {count}
                            </span>
                        </button>
                    </Link>            
        </div>
            )
}

export default CartWidget