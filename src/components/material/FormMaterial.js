import React, {useContext, useState, useEffect} from 'react'
import maletaContext from '../../context/maletas/maletaContext';
import materialContext from '../../context/material/materialContext';

const FormTareas = () => {

    // Obtener el state del formulario
    const maletasContext = useContext(maletaContext);
    const {maleta} = maletasContext;

    //Obtener la función del context de materiales
    const materialesContext = useContext(materialContext);
    const {
        materialSeleccionado, 
        errorMaterial, 
        agregarMaterial, 
        validarMaterial, 
        obtenerMaterial, 
        actualizarMaterial,
        limpiarMaterial
        } = materialesContext;

    //Effect que detecta los materiales seleccionados
    useEffect(() => {
        if(materialSeleccionado !== null){
            guardarMaterial(materialSeleccionado);
        }else{
            guardarMaterial({
                nombre: '',
                principal: '',
                subalmacen: '',
                codigo: ''
            })
        }
    }, [materialSeleccionado])
    //state del formulario
    const [material, guardarMaterial]= useState({
        nombre: '',
        principal: '',
        subalmacen: '',
        codigo: ''
    })

    //extraer el nombre de proyecto
    const {nombre, principal, subalmacen, codigo} = material;

    //leer los valores del formulario
    const handleChange = e => {
        guardarMaterial({
            ...material,
            [e.target.name]: e.target.value
        })
    }

    //Si no hay maleta seleccionado
    if(!maleta) return null;

    //array destructuring
    const [maletaActual] = maleta;
    
    //submit de nuevo material
    const onSubmitMaterial = e => {
        e.preventDefault();

        //validar
        if(nombre.trim() === '' || principal.trim() === '' || subalmacen.trim() === '' || codigo.trim() === ''){
            validarMaterial();
            return;
        }

        //pasar validación si es edición o nuevo
        if(materialSeleccionado === null){
            //agregar state nuevo a tareas
            material.maleta = maletaActual._id;
            agregarMaterial(material);
        }else{
            //actualizamos el material elegido
            actualizarMaterial(material);

            //elimina tarea seleccionada del state
            limpiarMaterial(material);
        }
        
        //obtener listado nuevo de materiales
        obtenerMaterial(maletaActual.id);

        //reiniciar el form
        guardarMaterial({
            nombre: '',
            principal: '',
            subalmacen: '',
            codigo: ''
        })
    }

    return ( 
        <div className="formulario">
            <form 
                onSubmit={onSubmitMaterial}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Material"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                    &nbsp;
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Principal"
                        name="principal"
                        value={principal}
                        onChange={handleChange}
                    />
                    &nbsp;
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Sub Almacén"
                        name="subalmacen"
                        value={subalmacen}
                        onChange={handleChange}
                    />
                    &nbsp;
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Código"
                        name="codigo"
                        value={codigo}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={materialSeleccionado?"Editar Material":"Agregar Material"}
                    />
                </div>
            </form>

            {errorMaterial ? <p className="mensaje error">Todos los campos son obligatorios</p>: null}
        </div>
     );
}
 
export default FormTareas;