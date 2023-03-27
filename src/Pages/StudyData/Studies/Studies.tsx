import React from "react";
import { Container, Box, Button, Typography, Grid, Modal, } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom"
import { DateTime } from "luxon";


import "./Studies.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const Studies = (props: { studies: any; }) => {
    const { studies } = props;
    const navigate = useNavigate(); 
    const onRowClick = (study:any) => {
        navigate(`./${study.name}/${study._id}`);
    };
   
  return (
   <Box mt={2}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>SN. </StyledTableCell>
            <StyledTableCell>Study name</StyledTableCell>
            <StyledTableCell align="center">Created By</StyledTableCell>
            <StyledTableCell align="center">Created At</StyledTableCell>
            <StyledTableCell align="center">Info</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studies.map((study:any, index: any) => (
            <StyledTableRow key={study.name} hover={true} onClick={() => onRowClick(study)}>
              <StyledTableCell>{index + 1}. </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {study.name}
              </StyledTableCell>
              <StyledTableCell align="center">{study.createdBy}</StyledTableCell>
              <StyledTableCell align="center">{DateTime.fromISO(study.createdAt).toLocaleString(DateTime.DATETIME_MED)}</StyledTableCell>
              <StyledTableCell align="center">{study.info || <>-</>}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}

export default Studies;
