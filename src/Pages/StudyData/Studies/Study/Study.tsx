import React from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { Container, Box, Button, Typography, Grid, Modal } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

import ResponsiveAppBar from "../../../../Components/AppBar/AppBar";
import UserData from "../../UserData/UserData";

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

const Study = () => {
  const { studyDataId } = useParams();
  const [studyData, setStudyData] = React.useState([]);
  const [selectedUserData, setSelectedUserData] = React.useState({});
  const navigate = useNavigate();
  React.useEffect(() => {
    axios
      .get(`http://localhost:5001/api/getUserGameData/studyId/${studyDataId}`)
      .then((response) => {
        setStudyData(response.data);
      });
  }, []);
  const onRowClick = (userGameData:any) => {
    setSelectedUserData(userGameData)
    navigate(`./userGameData/${userGameData._id}`);
  };
  console.log(selectedUserData);
  return (
    <Box>
      <ResponsiveAppBar />
      {studyData ? (
          <Container>
            <Typography> Table of users game data of @studyName:</Typography>
           <Box mt={2}>
           <TableContainer component={Paper}>
             <Table sx={{ minWidth: 700 }} aria-label="customized table">
               <TableHead>
                 <TableRow>
                   <StyledTableCell>Alias name</StyledTableCell>
                   <StyledTableCell align="center">Created At</StyledTableCell>
                 </TableRow>
               </TableHead>
               <TableBody>
                 {studyData.map((study:any) => (
                   <StyledTableRow key={study.aliasName} hover={true} onClick={() => onRowClick(study)}>
                     <StyledTableCell component="th" scope="row">
                       {study.aliasName}
                     </StyledTableCell>
                     <StyledTableCell align="center">{DateTime.fromISO(study.createdAt).toLocaleString(DateTime.DATETIME_MED)}</StyledTableCell>
                   </StyledTableRow>
                 ))}
               </TableBody>
             </Table>
           </TableContainer>
           </Box>
           </Container>
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
};

export default Study;
