import React from 'react'
import { Link } from 'react-router-dom';
import "./Item.css"

const Item = ({ id, nombre, precio, imagen, stock }) => {

    return (
        <div>
            <div className="columnItem">
                <div className="cardItem">
                    <img className='imgCardItem' src={imagen} alt='imagen card' />
                    <h3>{nombre}</h3>
                    <p>$ {precio}</p>
                    <Link to={`/detalle/${id}`}>
                        <button>
                            Ver detalle
                        </button></Link>
                </div>
            </div>
        </div>
    )
}

export default Item