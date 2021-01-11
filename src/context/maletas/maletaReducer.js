import {
    FORMULARIO_MALETA,
    OBTENER_MALETA,
    AGREGAR_MALETA,
    VALIDAR_FORMULARIO,
    MALETA_ACTUAL,
    ELIMINAR_MALETA,
    MALETA_ERROR
} from '../../types';

// eslint-disable-next-line
export default (state, action) => {
    switch(action.type){
        case FORMULARIO_MALETA:
            return{
                ...state,
                formulario: true
            }
        case OBTENER_MALETA:
            return{
                ...state,
                maletas: action.payload
            }
        case AGREGAR_MALETA:
            return{
                ...state,
                maletas: [...state.maletas, action.payload],
                formulario: false,
                errorFormulario:false
            }
        case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorFormulario: true
            }
        case MALETA_ACTUAL:
            return{
                ...state,
                maleta: state.maletas.filter(maleta=> maleta._id === action.payload)
            }
        case ELIMINAR_MALETA:
            return{
                ...state,
                maletas: state.maletas.filter(maleta=> maleta._id !== action.payload),
                maleta:null
            }
        case MALETA_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }
        default:
            return state;
    }
}