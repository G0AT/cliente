import React, {Fragment, useContext, useState} from 'react';
import maletaContext from '../../context/maletas/maletaContext';

const NuevaMaleta = () => {

    // Obtener el state del formulario
    const maletasContext = useContext(maletaContext);
    const {formulario, errorFormulario, mostrarFormulario, agregarMaletas, mostrarError} = maletasContext;

    //state para proyecto
    const [maleta, guardarMaleta] = useState({
        nombre: ''
    });

    //Extraer nombre del proyecto
    const {nombre} = maleta;

    //Lee contenido de input
    const onchangeMaleta = e => {
        guardarMaleta({
            ...maleta,
            [e.target.name] : e.target.value
        })
    }

    //Envía contenidos del input
    const onSubmitMaleta = e => {
        e.preventDefault();

        //Validación de proyecto
        if(nombre === ""){
            mostrarError();
            return;
        }
        
        //Agrega al state
        agregarMaletas(maleta)

        //Reinicia el Form
        guardarMaleta({
            nombre: ''
        })

    }

    //Mostrar el formulario
    const onClickFormulario = () => {
        mostrarFormulario();
    }

    return ( 
        <Fragment>
        <button
            type="button"
            className="btn btn-block btn-primario"
            onClick={onClickFormulario}
        >
            Nueva Maleta
        </button>

        {formulario?
                <form
                    className="formulario-nuevo-producto"
                    onSubmit={onSubmitMaleta}
                >
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Maleta"
                        name="nombre"
                        value={nombre}
                        onChange={onchangeMaleta}
                    />
                    <input 
                        type="submit"
                        className="btn btn-block btn-primario"
                        value="Agregar Maleta"
                        onSubmit={onSubmitMaleta}
                    />
            </form>
        :null
        }

        {errorFormulario? <p className="mensaje error">El nombre del grupo es obligatorio</p>: null} 

        </Fragment>
     );
}
 
export default NuevaMaleta;