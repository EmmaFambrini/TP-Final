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
import { GET_LIBROS } from "./AppConFetchLibro.jsx";

const AGREGAR_LIBRO = gql`
  mutation agregarLibro($input: LibroInput) {
    agregarLibro(input: $input) {
      _id
      nombre
      descripcion
      fechaIngreso
      genero
    }
  }
`;

export default function FormLibro() {

    const [agregarLibro, { data }] = useMutation(AGREGAR_LIBRO, {
        refetchQueries: [
          GET_LIBROS, // DocumentNode object parsed with gql
          'GetLibros' // Query name
        ],
    });  

    const sxFormLibro = {
        marginBottom : 2
    }

    // const { handlerActualizarPersona, personaActualizar, dispatch } = useContext(Context);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaIngreso, setFechaIngreso] = useState("");
    const [genero, setGenero] = useState("");
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
    }


    const handlerNombre = event => {
        setNombre(event.target.value);
    }

    function handlerDescripcion(event) {
        setDescripcion(event.target.value);
    }

    function handlerFechaIngreso(event) {
        setFechaIngreso(event.target.value);
    }

    const handlerGenero = event => {
        setGenero(event.target.value);
    }

    function limpiarForm() {
        // setId("");
        setNombre("");
        setDescripcion("");
        setFechaIngreso("");
        setGenero("");
        // setTipoDocumento("DNI");

        // if(actualizar) {
        //     setActualizar(false);

        //     // al llamar esta función de esta manera, dejamos indefinida la variable personaActualizar
        //     handlerActualizarPersona(); 
        // }
    }

    const handlerSubmit = event => {

        event.preventDefault();

        const libro = {
            // id : id,
            nombre : nombre,
            descripcion : descripcion,
            fechaIngreso : fechaIngreso,
            genero : genero
        }

        agregarLibro({ variables: { input: libro } })
        .then(() => limpiarForm())
        .catch(e => console.error(e))
    }

    return(
        <div style={{width:300, padding:10}}>
            <form id="formLibro" onSubmit={handlerSubmit}>
                
                 {/* <FormControl fullWidth>
                    <TextField 
                        id="id" 
                        label="Id" 
                        variant="outlined" 
                        size="small" 
                        fullWidth
                        value={id} 
                        onChange={handlerId}
                        sx={sxFormLibro}
                    />
                </FormControl> */}

                <FormControl fullWidth>
                    <TextField 
                        id="nombre" 
                        label="Nombre" 
                        variant="outlined" 
                        size="small" 
                        fullWidth
                        value={nombre} 
                        onChange={handlerNombre}
                        sx={sxFormLibro}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField 
                        id="descripcion" 
                        label="Descripcion" 
                        variant="outlined" 
                        size="medium"
                        value={descripcion}  
                        onChange={handlerDescripcion} 
                        sx={sxFormLibro}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField 
                        id="fechaIngreso" 
                        label="FechaIngreso" 
                        variant="outlined" 
                        size="medium"
                        value={fechaIngreso}  
                        onChange={handlerFechaIngreso} 
                        sx={sxFormLibro}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="labelTipoDocumento">Genero</InputLabel>
                    <Select
                        labelId="labelTipoDocumento"
                        id="genero"
                        value={genero}
                        label="Genero"
                        onChange={handlerGenero}
                        sx={sxFormLibro}
                    >
                        <MenuItem value={"TERROR"}>TERROR</MenuItem>
                        <MenuItem value={"FANTASIA"}>FANTASIA</MenuItem>
                        <MenuItem value={"COMEDIA"}>COMEDIA</MenuItem>
                    </Select>
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