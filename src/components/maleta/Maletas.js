import React, {useContext, useEffect} from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTareas from '../material/FormMaterial';
import ListadoTareas from '../material/ListadoMaterial';
import AuthContext from '../../context/authentication/authContext';

const Maletas = () => {

    //Extraer los datos de la autenticación
    const authContext = useContext(AuthContext);
    const {usuarioAutenticado} = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

    return ( 
        <div className="contenedor-app">
            <Sidebar/>
            <div className="seccion-principal">
                <Barra/>
                <main>
                    <FormTareas/>
                    <div className="contenedor-productos">
                        <ListadoTareas/>
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Maletas;