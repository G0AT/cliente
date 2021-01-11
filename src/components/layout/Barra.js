import React, {useContext, useEffect} from 'react';
import AuthContext from '../../context/authentication/authContext';

const Barra = (props) => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion  } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return ( 
        <div className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span> {usuario.nombre} </span> </p> : null}
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerrarSesion() }
                >Cerrar sesión</button>
            </nav>
        </div>
     );
}
 
export default Barra;