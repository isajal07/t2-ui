import React from 'react';
import axios from "axios";
import { Container, Box, Button, Typography, Grid, Modal } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router';

import ResponsiveAppBar
 from '../../../Components/AppBar/AppBar';
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

const UserData = () => {
    const { userGameDataId } = useParams();
    const [userGameData, setUserGameData] = React.useState<any>({});
    
    React.useEffect(() => {
        console.log("called", userGameData)
        axios
          .get(`http://localhost:5001/api/getUserGameData/${userGameDataId}`)
          .then((response) => {
            setUserGameData(response.data);
          });
      }, []);
    return (
        <Box>
      <ResponsiveAppBar />
            {userGameData ? 
                <Container>
            <Box>
                <Box>Alias Name: {userGameData.aliasName}</Box>
                <Box>Team: {userGameData.team}</Box>
                <Box>Black Hat Score: {userGameData.blackHatScore}</Box>
                <Box>White Hat Score: {userGameData.whiteHatScore}</Box>
                <Box>CreatedAt: {userGameData.createdAt}</Box>
                <Box>Download .cvs</Box>
                <Box>
                    <Box>EVENTS:</Box>
           <Box mt={2}>
           <TableContainer component={Paper}>
             <Table sx={{ minWidth: 700 }} aria-label="customized table">
               <TableHead>
                 <TableRow>
                   <StyledTableCell>Time</StyledTableCell>
                   <StyledTableCell align="center">Event</StyledTableCell>
                   <StyledTableCell align="center">Rule</StyledTableCell>
                   <StyledTableCell align="center">Building</StyledTableCell>
                   <StyledTableCell align="center">advisor</StyledTableCell>
                   <StyledTableCell align="center">latency</StyledTableCell>
                 </TableRow>
               </TableHead>
               <TableBody>
                 {userGameData?.events?.map((event:any) => (
                   <StyledTableRow key={event.time} hover={true}>
                     <StyledTableCell component="th" scope="row">
                       {event.time}
                     </StyledTableCell>
                     <StyledTableCell align="center">{event.eventName}</StyledTableCell>
                     <StyledTableCell align="center">{event.rule}</StyledTableCell>
                     <StyledTableCell align="center">{event.building}</StyledTableCell>
                     <StyledTableCell align="center">{event.advisor}</StyledTableCell>
                     <StyledTableCell align="center">{event.latency}</StyledTableCell>
                   </StyledTableRow>
                 ))}
               </TableBody>
             </Table>
           </TableContainer>
           </Box>
                </Box>
            </Box> 
           </Container>
            : <>Loading...</>}
        </Box>
    );
};

export default UserData;