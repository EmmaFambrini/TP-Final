import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Tabla(props) {

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 700, marginTop : 1 }}>
      <Table sx={{ maxWidth: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {props.columnas.map(columna => <TableCell key={columna}><strong>{columna}</strong></TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map(row => props.render(row))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}