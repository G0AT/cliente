import React, {Fragment, useContext} from 'react';
import HeaderMaterial from './HeaderMaterial';
import Material from './Material';
import maletaContext from '../../context/maletas/maletaContext';
import materialContext from '../../context/material/materialContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoTareas = () => {

    // Obtener el state del formulario
    const maletasContext = useContext(maletaContext);
    const {maleta, eliminarMaleta} = maletasContext;

    //Obtener los materiales según el grupo
    const materialesContext = useContext(materialContext);
    const {materialesMaleta} = materialesContext;

    //Si no hay proyecto seleccionado
    if(!maleta) return <h2>Selecciona un grupo</h2>


    //array destructuring
    const [maletaActual] = maleta;

    const onClickEliminar = () => {
        eliminarMaleta(maletaActual._id)
    }

    return ( 
        <Fragment>
            <h2>Usted ve: {maletaActual.nombre}</h2>

            <ul>
                { materialesMaleta.length === 0 ?
                    (<li className="tarea"><p>No hay material</p></li>)
                :   
                <Fragment>
                    <HeaderMaterial/>
                    <TransitionGroup>
                        {materialesMaleta.map (material=> (
                            <CSSTransition
                                key={material._id}
                                timeout={300}
                                classNames="tarea"
                            >   
                                <Material
                                    material={material}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </Fragment>
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >
                Eliminar Grupo
            </button>
        </Fragment>
     );
}
 
export default ListadoTareas;