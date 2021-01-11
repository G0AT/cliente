import React, {useContext} from 'react';
import maletaContext from '../../context/maletas/maletaContext';
import materialContext from '../../context/material/materialContext';

const Maleta = ({maleta}) => {

     // Obtener el state del formulario
     const maletasContext = useContext(maletaContext);
     const {maletaActual} = maletasContext;

     //Obtener la función del context de materiales
     const materialesContext = useContext(materialContext);
     const {obtenerMaterial} = materialesContext;

     //Función para agregar el maleta actual
     const seleccionarMaterial = id => {
         maletaActual(id); //fijamos maleta actual
         obtenerMaterial(id); //Filtrar las tareas al dar clic
     }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={()=>seleccionarMaterial(maleta._id)}
            >{maleta.nombre}</button>
        </li>
     );
}
 
export default Maleta;