import { useState, createContext } from "react";

const CartContext = createContext()

export const CartContextProvider = ({ children }) => {

    const [cart, setCart] = useState([])


    const addItem = (productToAdd) => {
        if (!isInCart(productToAdd.id)) {

            setCart([...cart, productToAdd])
        } else {
            const newCArt = cart.map(prod => {
                if (prod.id === productToAdd.id) {
                    const newProduct = {
                        ...prod,
                        count: productToAdd.count
                    }
                    return newProduct
                } else {
                    return prod
                }
            })

            setCart(newCArt)
        }
    }
    const isInCart = (id) => {
        return cart.some(prod => prod.id === id)
    }

    const getQuantity = () => {
        let accu = 0
        cart.forEach(prod => {
            accu += prod.count
        })
        return accu
    }

    const getProductQuantity = (id) => {
        const prod = cart.find(prod => prod.id === id)
        return prod ? prod.count : 0
    }

    const removeItem = (id) => {
        const newCart = cart.filter(prod => prod.id !== id)
        setCart(newCart)
    }

    const removeAllItem = () => {
        
        setCart([])
    }


    return (
        <CartContext.Provider value={{ cart, addItem, getQuantity, getProductQuantity, removeItem, removeAllItem }}>
            {children}
        </CartContext.Provider>)
}

export default CartContext