import React, { useState, useContext, useEffect } from "react";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { gql, useMutation } from '@apollo/client';
import { GET_BIBLIOTECAS } from "./AppConFetchBiblioteca.jsx";

const AGREGAR_BIBLIOTECA = gql`
  mutation agregarBiblioteca($input: BibliotecaInput) {
    agregarBiblioteca(input: $input) {
        _id 
        nombre 
        correoElectronico 
        ciudad
        cp
        direccion
    }
  }
`;

export default function FormBiblioteca() {

    const [agregarBiblioteca, { data }] = useMutation(AGREGAR_BIBLIOTECA, {
        refetchQueries: [
          GET_BIBLIOTECAS, // DocumentNode object parsed with gql
          'GetBibliotecas' // Query name
        ],
    });  

    const sxFormBiblioteca = {
        marginBottom : 2
    }

    const [nombre, setNombre] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [cp, setCp] = useState("");
    const [direccion, setDireccion] = useState("");
    // const [actualizar, setActualizar] = useState(false);

    // useEffect(() => {

    //     if(personaActualizar) {
    //         cargarForm();
    //         setActualizar(true);
    //     }

    // }, [personaActualizar])

    function cargarForm() {

        setNombre(personaActualizar.nombre)
        setApellido(personaActualizar.apellido)
        setDocumento(personaActualizar.documento)
        // setTipoDocumento(personaActualizar.tipoDocumento)
    }

    const handlerNombre = event => {
        setNombre(event.target.value);
    }

    function handlerCorreoElectronico(event) {
        setCorreoElectronico(event.target.value);
    }

    const handlerCiudad = event => {
        setCiudad(event.target.value);
    }

    const handlerCp = event => {
        setCp(event.target.value);
    }

    const handlerDireccion = event => {
        setDireccion(event.target.value);
    }

    function limpiarForm() {
        // setId("");
        setNombre("");
        setCorreoElectronico("");
        setCiudad("");
        setCp("");
        setDireccion("");

        // if(actualizar) {
        //     setActualizar(false);

        //     // al llamar esta función de esta manera, dejamos indefinida la variable personaActualizar
        //     handlerActualizarPersona(); 
        // }
    }

    const handlerSubmit = event => {

        event.preventDefault();

        const biblioteca = {
            // id : id,
            nombre : nombre,
            correoElectronico : correoElectronico,
            // domicilio : domicilio,
            ciudad : ciudad,
            cp : cp,
            direccion : direccion
        }

        agregarBiblioteca({ variables: { input: biblioteca } })
        .then(() => limpiarForm())
        .catch(e => console.error(e))
    }

    return(
        <div style={{width:300, padding:10}}>
            <form id="formBiblioteca" onSubmit={handlerSubmit}>
            
                <FormControl fullWidth>
                    <TextField 
                        id="nombre" 
                        label="Nombre" 
                        variant="outlined" 
                        size="small" 
                        fullWidth
                        value={nombre} 
                        onChange={handlerNombre}
                        sx={sxFormBiblioteca}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField 
                        id="correoElectronico" 
                        label="Correo" 
                        variant="outlined" 
                        size="medium"
                        value={correoElectronico}  
                        onChange={handlerCorreoElectronico} 
                        sx={sxFormBiblioteca}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField 
                        id="ciudad" 
                        label="Ciudad" 
                        variant="outlined" 
                        size="medium"
                        value={ciudad}  
                        onChange={handlerCiudad} 
                        sx={sxFormBiblioteca}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField 
                        id="cp" 
                        label="CP" 
                        variant="outlined" 
                        size="medium"
                        value={cp}  
                        onChange={handlerCp} 
                        sx={sxFormBiblioteca}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField 
                        id="direccion" 
                        label="Direccion" 
                        variant="outlined" 
                        size="medium"
                        value={direccion}  
                        onChange={handlerDireccion} 
                        sx={sxFormBiblioteca}
                    />
                </FormControl>
                <Button 
                    variant="contained" 
                    color="success" 
                    startIcon={<SaveIcon />}
                    size="small"
                    type="submit">
                    Guardar
                </Button>&nbsp;
                {/* {actualizar &&
                    <Button 
                        variant="contained" 
                        color="warning" 
                        startIcon={<CancelIcon />}
                        size="small"
                        onClick={limpiarForm}
                    >
                        Cancelar
                    </Button>
                } */}
            </form>
        </div>
    )
}