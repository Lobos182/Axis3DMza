import { db, collectionName } from ".";
import { addDoc, getDocs, getDoc, doc, query, writeBatch, where, documentId, collection } from "firebase/firestore"

export const getProduct = (productoId) => {
    return new Promise((resolve, reject) => {
        getDoc(doc(db, 'products', productoId)).then(response => {
            console.log(response)
            const product = { id: response.id, ...response.data() }
            resolve(product)
        }).catch(error => {
            reject(error)
        })
    })
}

export const getProductsByCategory = (categoriaId) => {
    return new Promise((resolve, reject) => {
        const collectionRef = categoriaId
            ? query(collection(db, 'products'), where('categoria', '==', categoriaId))
            : collection(db, 'products')

        getDocs(collectionRef).then(response => {

            const products = response.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            })

            resolve(products)
        }).catch(error => {
            reject(error)
        })
    })
}

// export const getCarritoCompra = (cart,objOrden) => {
//     return new Promise((resolve, reject) => {
//         const ids = cart.map(prod => prod.id)
//         const batch = writeBatch(db)
//         const sinStock = []
//         const collectionRef = collection(db, collectionName.products)

//         getDocs(query(collectionRef, where(documentId(), 'in', ids)))
//             .then(response => {
//                 response.docs.forEach(doc => {
//                     const dataDoc = doc.data()

//                     const prodCount = cart.find(prod => prod.id === doc.id)?.count

//                     if (dataDoc.stock >= prodCount) {
//                         batch.update(doc.ref, { stock: dataDoc.stock - prodCount })

//                     } else {
//                         sinStock.push({ id: doc.id, ...dataDoc })
//                     }

//                 })
//             }).then(() => {
//                 if (sinStock.length === 0) {
//                     const collectionRef = collection(db, collectionName.orders)

//                     return addDoc(collectionRef, objOrden)
//                 } else {
//                     return Promise.reject({ type: 'out_of_stock', products: sinStock })
//                 }
//             }).then(({ id }) => {
//                 batch.commit()
//                 resolve(id)
//             }).catch(error => {                
//                     reject(error)          
                
//             })



//     })

// }