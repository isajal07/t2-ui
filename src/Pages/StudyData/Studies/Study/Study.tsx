import React from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { Container, Box, Button, Typography, Grid, Modal, IconButton } from "@mui/material";
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
import DownloadIcon from '@mui/icons-material/Download';
import { CSVLink, CSVDownload } from "react-csv";

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
  const { studyDataId, studyDataName } = useParams();
  const [studyData, setStudyData] = React.useState([]);
  const [selectedUserData, setSelectedUserData] = React.useState({});
  const navigate = useNavigate();
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/getUserGameData/studyId/${studyDataId}`)
      .then((response) => {
        setStudyData(response.data);
      });
  }, []);
  const onRowClick = (userGameData:any) => {
    setSelectedUserData(userGameData)
    navigate(`./userGameData/${userGameData._id}`);
  };
  const downloadCSV = () => {
    console.log('download!')
  };
  return (
    <Box>
      <ResponsiveAppBar />
      {studyData ? (
          <Container>
           <Box mt={2}>
            <Box mb={2}><Typography fontSize={30}> {studyDataName}:</Typography></Box>
           <TableContainer component={Paper}>
             <Table sx={{ minWidth: 700 }} aria-label="customized table">
               <TableHead>
                 <TableRow>
                  <StyledTableCell>SN. </StyledTableCell>
                   <StyledTableCell>Alias name</StyledTableCell>
                   <StyledTableCell align="center">Created At</StyledTableCell>
                   {/* <StyledTableCell align="center">Download CSV</StyledTableCell> */}
                 </TableRow>
               </TableHead>
               <TableBody>
                 {studyData.map((study:any, index: any) => (
                   <StyledTableRow key={study.name} hover={true} onClick={() => onRowClick(study)}>
                    <StyledTableCell component="th" scope="row">
                       {index + 1}.
                     </StyledTableCell>
                     <StyledTableCell component="th" scope="row">
                       {study.name}
                     </StyledTableCell>
                     <StyledTableCell align="center">{DateTime.fromISO(study.createdAt).toLocaleString(DateTime.DATETIME_MED)}</StyledTableCell>
                     {/* <StyledTableCell align="center"><IconButton aria-label="download" onClick={downloadCSV}><DownloadIcon/></IconButton></StyledTableCell> */}
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
