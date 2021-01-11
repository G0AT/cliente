import React, {useReducer} from 'react';
//import {v4 as uuidv4} from 'uuid';
import MaterialContext from './materialContext';
import MaterialReducer from './materialReducer';
import {
    MATERIAL_MALETA,
    AGREGAR_MATERIAL,
    VALIDAR_MATERIAL,
    ELIMINAR_MATERIAL,
    MATERIAL_ACTUAL,
    ACTUALIZAR_MATERIAL,
    LIMPIAR_MATERIAL
} from '../../types';
import clienteAxios from '../../config/axios';

const MaterialState = props => {

    const initialState = {
        materialesMaleta: [],
        errorMaterial: false,
        materialSeleccionado: null
    }

    //Dispatch y state
    const [state, dispatch] = useReducer(MaterialReducer, initialState);

    //Crear las funciones
    

    //Obtener las tareas del proyecto
    const obtenerMaterial = async maleta => {
        try{
            const resultado = await clienteAxios.get('/api/materiales/', {params: {maleta}});
            dispatch({
                type: MATERIAL_MALETA,
                payload: resultado.data.materiales
            })
        }catch(error){
            console.log(error);
        }
    }

    //Agregar material nuevo al proyecto
    const agregarMaterial = async material => {
        try {
            const resultado = await clienteAxios.post('/api/materiales', material);
            dispatch({
                type: AGREGAR_MATERIAL,
                payload: resultado.data.material
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Valida y muestra error
    const validarMaterial = () =>{
        dispatch({
            type: VALIDAR_MATERIAL
        })
    }

    //Eliminar material
    const eliminarMaterial = async (id, maleta) => {
        try {
            await clienteAxios.delete(`/api/materiales/${id}`, {params: {maleta}});
            dispatch({
                type: ELIMINAR_MATERIAL,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Extrae el material a editar
    const guardarMaterialActual = material =>{
        dispatch({
            type: MATERIAL_ACTUAL,
            payload: material
        })
    }

    //edita el material
    const actualizarMaterial = async material => {
        try {
            const resultado = await clienteAxios.put(`../api/materiales/${material._id}`, material);
            dispatch({
                type: ACTUALIZAR_MATERIAL,
                payload: resultado.data.material
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Limpiar campos de material seleccionado
    const limpiarMaterial = () => {
        dispatch({
            type: LIMPIAR_MATERIAL
        })
    }

    return(
        <MaterialContext.Provider
            value={{
                materialesMaleta: state.materialesMaleta,
                errorMaterial: state.errorMaterial,
                materialSeleccionado: state.materialSeleccionado,
                obtenerMaterial,
                agregarMaterial,
                validarMaterial,
                eliminarMaterial,
                guardarMaterialActual,
                actualizarMaterial,
                limpiarMaterial
            }}
        >
            {props.children}
        </MaterialContext.Provider>
    )
}

export default MaterialState;