import React, { useContext, useState } from 'react'
import CartContext from '../../context/CartContext'
import "./FormContent.css"
import {
  addDoc, collection, getDocs, query, where, documentId, writeBatch
} from 'firebase/firestore';
import { db, collectionName } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
// import { getCarritoCompra } from '../../services/firebase/firestore';


const FormContent = () => {
  const [loading, setLoading] = useState(false)
  const { cart, removeAllItem, totalCompra } = useContext(CartContext)


  const navigate = useNavigate()

  const comprobarEmail = () => {
    const email1 = document.f1.email1.value
    const email2 = document.f1.email2.value
    if (email1 !== email2) {
      swal("Los Correo no son Iguales")
    }
  }

  const [comprador, setComprador] = useState({
    nombre: '',
    email: '',
    telefono: '',
    Direccion: '',
    Comentario: ''
  })

  const crearOrden = () => {
    setLoading(true)
    const objOrden = {
      comprador,
      items: cart,
      total: totalCompra
    }
    // getCarritoCompra(cart,objOrden).then(response=>{

    // })
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
        swal({
          title: `El id de la orden es: ${id}`,
          text: "Gracias por su compra",
          icon: "success",
        });
        removeAllItem()
        navigate('/')

      }).catch(error => {
        if (error.type === 'out_of_stock') {
          swal({
            title: `Del Producto " ${sinStock.map(prod => prod.nombre)} " solo quedan en Stock : ${sinStock.map(prod => prod.stock)}`,
            text: "",
            icon: "error",
          });
          navigate('/cart')
        }
      }).finally(() => {
        setLoading(false)
      })
  }

  if (loading) {
    return <h1>Generando Orden</h1>
  }


  return (
    <div className='divform'>
      <h1>Finalizando Compra</h1>
      <p>Por favor Complete los siguientes datos para poder finalizar la compra</p>
      <p>Los Datos con * son obligatorios</p>
      <p>----------------------------------------------------------------------</p>
      <form onSubmit={crearOrden} name="f1">
        <label htmlFor="fname">Nombre *</label>
        <input className='form' placeholder='nombre' required="required" id='fname' Value={comprador.nombre} onChange={(e) => setComprador({ ...comprador, nombre: e.target.value })} />
        <label htmlFor="femail">Email *</label>
        <input className='form' placeholder='email' name="email1" required="required" id='femail' Value={comprador.email} onChange={(e) => setComprador({ ...comprador, email: e.target.value })} />
        <label htmlFor="femail2">Repetir Email *</label>
        <input className='form' placeholder='email' name="email2" required="required" id='femail' />

        <label htmlFor="ftelefono">Telefono *</label>
        <input className='form' placeholder='telefono' onClick={comprobarEmail} required="required" id='ftelefono' Value={comprador.telefono} onChange={(e) => setComprador({ ...comprador, telefono: e.target.value })} />
        <label htmlFor="fDireccion">Direccion *</label>
        <input className='form' placeholder='Direccion' required="required" id='fDireccion' Value={comprador.Direccion} onChange={(e) => setComprador({ ...comprador, Direccion: e.target.value })} />
        <label htmlFor="fComentario">Comentario</label>
        <input className='form' placeholder='Comentario' id='fComentario' Value={comprador.Comentario} onChange={(e) => setComprador({ ...comprador, Comentario: e.target.value })} />
        <label htmlFor="fTerminos">Acepta nuestros <a href='#!'> Terminos y Condiciones  </a>*
          <input type='checkbox' required="required" /></label>
        <input type='submit' className='finaliza' value='Finalizar compra' />
      </form>
    </div>
  )
}

export default FormContent