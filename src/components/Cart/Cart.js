import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext'
import "./Cart.css"
import {
    addDoc, collection, getDocs, query, where, documentId, writeBatch
} from 'firebase/firestore';
import { db, collectionName } from '../../services/firebase';
import FormContent from '../FormContent/FormContent';


const Cart = () => {

    const [loading, setLoading] = useState(false)
    const { cart, removeItem, removeAllItem, totalCompra } = useContext(CartContext)
    const [comprador, setComprador] = useState({
        nombre: '',
        email: '',
        telefono: '',
        Direccion: '',
        Comentario: ''
    })


    useEffect(() => {
        document.querySelectorAll('.button').forEach(button => button.addEventListener('click', e => {
            if (!button.classList.contains('delete')) {
                button.classList.add('delete');
                setTimeout(() => button.classList.remove('delete'), 3200);
            }
            e.preventDefault();
        }));
    })

    const crearOrden = () => {
        setLoading(true)
        const objOrden = {
            comprador,
            items: cart,
            total: totalCompra
        }

        const ids = cart.map(prod => prod.id)
        const batch = writeBatch(db)
        const sinStock = []
        const collectionRef = collection(db, collectionName.products)

        getDocs(query(collectionRef, where(documentId(), 'in', ids)))
            .then(response => {
                response.docs.forEach(doc => {
                    const dataDoc = doc.data()

                    const prodCount = cart.find(prod => prod.id === doc.id)?.count

                    if (dataDoc.stock >= prodCount) {
                        batch.update(doc.ref, { stock: dataDoc.stock - prodCount })

                    } else {
                        sinStock.push({ id: doc.id, ...dataDoc })
                    }

                })
            }).then(() => {
                if (sinStock.length === 0) {
                    const collectionRef = collection(db, collectionName.orders)

                    return addDoc(collectionRef, objOrden)
                } else {
                    return Promise.reject({ type: 'out_of_stock', products: sinStock })
                }
            }).then(({ id }) => {
                batch.commit()
                console.log(`El id de la orden es: ${id}`)
                removeAllItem()
            }).catch(error => {
                if (error.type === 'out_of_stock') {
                    console.log(`Del ${sinStock.map(prod => prod.nombre)} solo quedan : ${sinStock.map(prod => prod.stock)}`)
                }
            }).finally(() => {
                setLoading(false)
            })
    }

    if (loading) {
        return <h1>Generando Orden</h1>
    }

    return (

        <div className='cartContainer'>
            {cart.length === 0 ?
                <><h1>Carrito Vacio <br></br> Ups.. no hay nada aca, puedes ir a ver nuestros </h1><div>
                    <Link className='Link' to="/">
                        <button className='finaliza'>Productos</button>
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

                        <FormContent />
                        <button className='finaliza' onClick={crearOrden}>Finalizar compra</button>

                    </div>
                    <div className='divform'>
                        <form>
                            <label htmlFor="fname">nombre</label>
                            <input className='form' placeholder='nombre' id='fname' dValue={comprador.nombre} onChange={(e) => setComprador({ ...comprador, nombre: e.target.value })} />
                            <label htmlFor="femail">email</label>
                            <input className='form' placeholder='email' id='femail' Value={comprador.email} onChange={(e) => setComprador({ ...comprador, email: e.target.value })} />
                            <label htmlFor="ftelefono">telefono</label>
                            <input className='form' placeholder='telefono' id='ftelefono' Value={comprador.telefono} onChange={(e) => setComprador({ ...comprador, telefono: e.target.value })} />
                            <label htmlFor="fDireccion">Direccion</label>
                            <input className='form' placeholder='Direccion' id='fDireccion' Value={comprador.Direccion} onChange={(e) => setComprador({ ...comprador, Direccion: e.target.value })} />
                            <label htmlFor="fComentario">Comentario</label>
                            <input className='form' placeholder='Comentario' id='fComentario' Value={comprador.Comentario} onChange={(e) => setComprador({ ...comprador, Comentario: e.target.value })} />
                        </form>
                    </div></>}


        </div >
    )
}

export default Cart