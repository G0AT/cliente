import React, {useState, useContext, useEffect} from "react";
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertasContext';
import AuthContext from '../../context/authentication/authContext';

const Login = (props) => {

    //Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, iniciarSesion} = authContext;

    //Si el password o usuario es incorrecto
    useEffect (() => {
        if(autenticado){
            props.history.push('/maletas');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    //State que valida el change en los inputs de inicio se sesión
    const [usuario, guardarUsuario] = useState ({
        email: '',
        password: ''
    });

    //Extracción del usuario
    const {email, password} = usuario;

    //Almacena los datos en el hooks y state para su visualización desde componentes
    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    //Cuando el usuario intenta iniciar sesión
    const onSubmit = e => {
        e.preventDefault();

        //Valida campos vacios
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }else{

        }

        //Pase al action
        iniciarSesion({email, password});
    }
     

    return ( 
        <div className="form-usuario">
            {alerta? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) :null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form 
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="tu@email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="********"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>

                <Link to={'/nueva-cuenta'} className="enlace-cuenta">Registrarse</Link>
            </div>
        </div>
    )
}

export default Login;