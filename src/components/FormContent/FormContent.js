import swal from 'sweetalert';
import React from 'react'

const FormContent = () => {

    const mostrarAlerta=()=>{
        swal({
            content: {
              element: "input",
              attributes: {
                placeholder: "Ingresa tu Nombre",
                type: "text"
              },
            },
          });


    }
  return (
    <div>
        <button className='finaliza' onClick={()=>mostrarAlerta()}>Alertaaa</button>
    </div>
  )
}

export default FormContent