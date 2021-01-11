import React, {useState, useContext, useEffect} from "react";
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertasContext';
import AuthContext from '../../context/authentication/authContext';
const NuevaCuenta = (props) => {
    //Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario} = authContext;

    //Si el usuario se autenticó o duplica el registro
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
        nombre:'',
        email: '',
        password: '',
        confirmar: ''
    });

    //Extracción del usuario
    const {nombre,email, password,confirmar} = usuario;

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
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //password minimo de 6 caracteres
        if(password.length < 8){
            mostrarAlerta('La contraseña debe contener al menos 8 caracteres', 'alerta-error');
            return;
        }

        //Validación de passwords similares
        if(password !== confirmar){
            mostrarAlerta('Las contraseñas no son similares', 'alerta-error');
            return;
        }

        //Pase al action
        registrarUsuario({nombre, email, password});

    }
     

    return ( 
        <div className="form-usuario">
            {alerta? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) :null}
            <div className="contenedor-form sombra-dark">
                <h1>Registro de usuario</h1>
                <form 
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            placeholder="Nombre completo"
                            onChange={onChange}
                        />
                    </div>
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
                        <label htmlFor="confirmar">Confirmar contraseña</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            value={confirmar}
                            placeholder="********"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Registrarse"
                        />
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">Ya tengo un usuario</Link>
            </div>
        </div>
    )
}

export default NuevaCuenta;