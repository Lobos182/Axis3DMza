import { useState } from "react"
import './ItemCount.css'


const ItemCount = ({ onConfirm, stock, initial = 1 }) => {

    const [count, setCount] = useState(initial)

    const decrement = () => {
        if (count <= 1) {
            console.log("No existen los productos negativos :) ")
        } else {
            setCount(count - 1)
        }
    }

    const increment = () => {
        if (count >= stock) {
            console.log("no hay mas Stock")
        } else {
            setCount(count + 1)
        }
    }


    return (

        <div>
            <div className="wrapper">
                <button className="plusminus" onClick={decrement}>-</button>
                <input type="number" class="num" value={count} />
                <button className="plusminus" onClick={increment}>+</button>
            </div >
            <button className="agregarcarrito" onClick={() => onConfirm(count)}>
                Agregar al Carrito
            </button>
        </div>
    )


}
export default ItemCount