import React, { useReducer } from 'react';
import maletaContext from './maletaContext';
import maletaReducer from './maletaReducer';
import clienteAxios from '../../config/axios';
import {
    FORMULARIO_MALETA,
    OBTENER_MALETA,
    AGREGAR_MALETA,
    VALIDAR_FORMULARIO,
    MALETA_ACTUAL,
    ELIMINAR_MALETA,
    MALETA_ERROR
} from '../../types';

const MaletaState = props => {

    const initialState = {
        maletas: [],
        formulario : false,
        errorFormulario: false,
        maleta: null,
        mensaje: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(maletaReducer, initialState);

    //Funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_MALETA
        })
    }

    //obtener las maletas actuales
    const obtenerMaletas = async () => {
        try {
            const resultado = await clienteAxios.get('/api/maletas');
            //Insertar el producto en el state
            dispatch({
                type: OBTENER_MALETA,
                payload: resultado.data.maletas
            })
        }catch(error){
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: MALETA_ERROR,
                payload: alerta
            })

        }
    }

    //agreagar nuevo grupo
    const agregarMaletas = async maleta => {
        
        try{
            const resultado = await clienteAxios.post('/api/maletas', maleta);

            //Insertar el producto en el state
            dispatch({
                type: AGREGAR_MALETA,
                payload: resultado.data
            })
        }catch(error){
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: MALETA_ERROR,
                payload: alerta
            })

        }
    }
    
    //Validar formulario
    const mostrarError = () =>{
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //Selecciona el proyecto al que el usuario dió clic
    const maletaActual = maleta => {
        dispatch({
            type: MALETA_ACTUAL,
            payload:maleta
        })
    }

    //Eliminar la maleta
    const eliminarMaleta = async maletaId =>{
        try{
            await clienteAxios.delete(`/api/maletas/${maletaId}`);

            //Insertar el producto en el state
            dispatch({
                type: ELIMINAR_MALETA,
                payload: maletaId
            })
        }catch(error){
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: MALETA_ERROR,
                payload: alerta
            })

        }
    }

    return(
        <maletaContext.Provider
            value={{
                errorFormulario: state.errorFormulario,
                maletas: state.maletas,
                formulario: state.formulario,
                maleta: state.maleta,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerMaletas,
                agregarMaletas,
                mostrarError,
                maletaActual,
                eliminarMaleta
            }}
        >
            {props.children}
        </maletaContext.Provider>
    )
}
 
export default MaletaState;