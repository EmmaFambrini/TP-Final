import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery, gql } from '@apollo/client';
import FormBiblioteca from "./FormBiblioteca.jsx"

export const GET_BIBLIOTECAS = gql`
  query GetBibliotecas {
    bibliotecas {
        _id 
        nombre 
        correoElectronico
        ciudad
        cp
        direccion
    }
  }
`;

export default function AppConFetchBiblioteca() {

    const { loading, error, data } = useQuery(GET_BIBLIOTECAS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const columnas =  ["Nombre", "Correo Electrónico", "Ciudad", "CP", "Dirección"];

    return(
        <div style={{display:"flex"}}>
            <FormBiblioteca />
            <TableContainer component={Paper} sx={{ maxWidth: 700, marginTop : 1 }}>
                <Table sx={{ maxWidth: 700 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columnas.map(columna => <TableCell key={columna}><strong>{columna}</strong></TableCell>)}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.bibliotecas.map(biblioteca =>
                            <TableRow key={biblioteca._id}>
                                <TableCell>{biblioteca.nombre}</TableCell>
                                <TableCell>{biblioteca.correoElectronico}</TableCell>
                                <TableCell>{biblioteca.ciudad}</TableCell>
                                <TableCell>{biblioteca.cp}</TableCell>
                                <TableCell>{biblioteca.direccion}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}