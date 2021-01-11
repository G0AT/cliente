import React, { useContext, useEffect } from 'react';
import Maleta from './Maleta';
import maletaContext from '../../context/maletas/maletaContext';
import AlertaContext from '../../context/alertas/alertasContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoMaletas = () => {

    const maletasContext = useContext(maletaContext);
    const {mensaje, maletas, obtenerMaletas} = maletasContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    useEffect (() => {
        //Funciona si hay un error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        obtenerMaletas();
        // eslint-disable-next-line
    }, [mensaje]);

    //Validar existencia de productos
    if(maletas.length === 0) return <p>No existen grupos, cree uno para comenzar</p>;
         
    //validación de si tiene contenido productos
    if(maletas.length === 0) return null;

    return ( 
        <ul className="Listado-productos">
            {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> :null}
            <TransitionGroup>
                {maletas.map(maleta => (
                    <CSSTransition
                        key={maleta._id}
                        timeout={300}
                        classNames="productos"
                    >
                        <Maleta
                            maleta={maleta}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
            
        </ul>
     );
}
 
export default ListadoMaletas;