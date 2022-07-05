import { useState } from "react"
import './ItemCount.css'
import swal from 'sweetalert';


const ItemCount = ({ onConfirm, stock, initial }) => {
    initial = 1;
    const [count, setCount] = useState(initial)

    const decrement = () => {
        if (count <= 1) {
            swal({
                title: 'No puede seguir bajando',
                text: " :S",
                icon: "error",
                closeOnClickOutside: false
            });
            console.log("No existen los productos negativos :) ")
        } else {
            setCount(count - 1)
        }
    }

    const increment = () => {
        if (count >= stock) {
            swal({
                title: 'No hay mas Stock',
                text: "Disculpe a la brevedad repondremos",
                icon: "error",
                closeOnClickOutside: false
            });
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
            <div className="botonAgregar">
            <button className="agregarcarrito" onClick={() => onConfirm(count)}>
                Agregar al Carrito
            </button>
            </div>
        </div>
    )


}
export default ItemCount