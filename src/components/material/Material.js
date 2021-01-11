import React, {useContext} from 'react'
import maletaContext from '../../context/maletas/maletaContext';
import materialContext from '../../context/material/materialContext';

const Material = ({material}) => {

    // Obtener el state del formulario
    const maletasContext = useContext(maletaContext);
    const {maleta} = maletasContext;

    //Obtener los materiales según el grupo
    const materialesContext = useContext(materialContext);
    const {eliminarMaterial, obtenerMaterial, actualizarMaterial, guardarMaterialActual} = materialesContext;

    //Extraer el producto
    const [maletaActual] = maleta;

    //función a ejecutar para eliminar
    const materialEliminar = id => {
        eliminarMaterial(id, maletaActual._id);
        obtenerMaterial(maletaActual.id);
    }

    //Función que modifica la cantidad de los materiales
    const cambiarEstado = material => {
        if(material.estado){
            material.estado = false;
        } else {
            material.estado = true;
        }

        actualizarMaterial(material);
    }

    // agregar una tarea para editar
    const seleccionarMaterial = material => {
        guardarMaterialActual(material);
    }

    return ( 
        <li className="tarea sombra">
            <p>{material.nombre}</p>
            <p>{material.cantidad}</p>
            <p>{material.codigo}</p>
            <div className="estado">
                {material.estado
                ? (<button 
                        type="button" 
                        className="completo"
                        onClick={() => cambiarEstado(material)}
                    >
                        Vigente
                    </button>)
                : (<button 
                        type="button" 
                        className="incompleto"
                        onClick={() => cambiarEstado(material)}
                    >
                        Descontinuado
                    </button>)
            }
            </div>
            <div className="acciones">
                <button 
                    type="button" 
                    className="btn btn-primario"
                    onClick={()=> seleccionarMaterial(material)}
                >
                    Editar
                </button>
                
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => materialEliminar(material._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Material;