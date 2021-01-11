import {
    MATERIAL_MALETA,
    AGREGAR_MATERIAL,
    VALIDAR_MATERIAL,
    ELIMINAR_MATERIAL,
    MATERIAL_ACTUAL,
    ACTUALIZAR_MATERIAL,
    LIMPIAR_MATERIAL
} from '../../types';

// eslint-disable-next-line
export default (state, action) => {
    switch(action.type){
        case MATERIAL_MALETA:
            return{
                ...state,
                materialesMaleta: action.payload
            }
        case AGREGAR_MATERIAL:
            return {
                ...state,
                materialesMaleta: [...state.materialesMaleta, action.payload],
                errorMaterial:false
            }
        case VALIDAR_MATERIAL:
            return{
                ...state,
                errorMaterial: true
            }
        case ELIMINAR_MATERIAL:
            return{
                ...state,
                materialesMaleta: state.materialesMaleta.filter(material => material._id !== action.payload)
            }
        case ACTUALIZAR_MATERIAL:
            return{
                ...state,
                materialesMaleta: state.materialesMaleta.map(material => material._id === action.payload._id ? action.payload : material)
            }
        case MATERIAL_ACTUAL:
            return{
                ...state,
                materialSeleccionado: action.payload
            }
        case LIMPIAR_MATERIAL:
            return{
                ...state,
                materialSeleccionado:null
            }
        default:
            return state;
    }
}