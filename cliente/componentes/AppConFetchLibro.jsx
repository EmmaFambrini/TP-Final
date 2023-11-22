import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery, gql } from '@apollo/client';
import FormLibro from "./FormLibro.jsx"

export const GET_LIBROS = gql`
  query GetLibros {
    libros {
        _id
        nombre
        descripcion
        fechaIngreso
        genero
    }
  }
`;

export default function AppConFetchLibro() {

    const { loading, error, data } = useQuery(GET_LIBROS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const columnas =  ["Nombre", "Descripción", "Fecha de Ingreso", "Género"];

    return(
        <div style={{display:"flex"}}>
            <FormLibro />
            <TableContainer component={Paper} sx={{ maxWidth: 700, marginTop : 1 }}>
                <Table sx={{ maxWidth: 700 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columnas.map(columna => <TableCell key={columna}><strong>{columna}</strong></TableCell>)}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.libros.map(libro =>
                            <TableRow key={libro._id}>
                                <TableCell>{libro.nombre}</TableCell>
                                <TableCell>{libro.descripcion}</TableCell>
                                <TableCell>{libro.fechaIngreso}</TableCell>
                                <TableCell>{libro.genero}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}