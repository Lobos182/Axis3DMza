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
  const [text, enableButton] = useState("");
  const navigate = useNavigate()

  const handleTextChange = (event) => {
    enableButton("false");
  };

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
      <p>----------------------------------------------------------------------</p>
      <form>
        <label htmlFor="fname">nombre</label>
        <input className='form' placeholder='nombre' id='fname' Value={comprador.nombre} on onChange={(e) => { setComprador({ ...comprador, nombre: e.target.value }); handleTextChange() }} />
        <label htmlFor="femail">email</label>
        <input className='form' placeholder='email' id='femail' Value={comprador.email} onChange={(e) => { setComprador({ ...comprador, email: e.target.value }); handleTextChange() }} />
        <label htmlFor="ftelefono">telefono</label>
        <input className='form' placeholder='telefono' id='ftelefono' Value={comprador.telefono} onChange={(e) => { setComprador({ ...comprador, telefono: e.target.value }); handleTextChange() }} />
        <label htmlFor="fDireccion">Direccion</label>
        <input className='form' placeholder='Direccion' id='fDireccion' Value={comprador.Direccion} onChange={(e) => { setComprador({ ...comprador, Direccion: e.target.value }); handleTextChange() }} />
        <label htmlFor="fComentario">Comentario</label>
        <input className='form' placeholder='Comentario' id='fComentario' Value={comprador.Comentario} onChange={(e) => { setComprador({ ...comprador, Comentario: e.target.value }); handleTextChange() }} />
      </form>
      <div>
        <button className='finaliza' disabled={!text} onClick={crearOrden}>Finalizar compra</button>
      </div>


    </div>
  )
}

export default FormContent