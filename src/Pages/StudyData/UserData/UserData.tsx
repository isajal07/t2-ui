import React from "react";
import axios from "axios";
import { Container, Box, Button, Typography, Grid, Modal } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router";
import TablePagination from "@mui/material/TablePagination";
import ResponsiveAppBar from "../../../Components/AppBar/AppBar";
import DataAnalysis from "./DataAnalysis/DataAnalysis";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UserData = () => {
  const { userGameDataId, studyDataName } = useParams();
  const [userGameData, setUserGameData] = React.useState<any>({});
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [page, setPage] = React.useState(0);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  React.useEffect(() => {
    axios
    .get(
      `${process.env.REACT_APP_API_URL}api/getUserGameData/${userGameDataId}`
      )
      .then((response) => {
        setUserGameData(response.data);
      });
    }, [userGameDataId]);
    
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

  return (
    <Box>
      <ResponsiveAppBar />
      {userGameData ? (
        <Container>
          <Box mt={3}>
            <Grid container>
              <Grid item xs={4}>
                <Typography>
                  <b>Alias name:</b> {userGameData.name}{" "}
                </Typography>
                <Typography>
                  <b>Group :</b> {userGameData.group}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <b>White Hat Score:</b> {userGameData.whitehatScore}
                </Typography>
                <Typography>
                  <b>Black Hat Score:</b> {userGameData.blackhatScore}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <b>Settings</b>: {userGameData.settingsId?.name}
                </Typography>
                <Typography>
                  <b>Study:</b> {studyDataName}
                </Typography>
              </Grid>
            </Grid>
            <DataAnalysis userGameData={userGameData}/>
            <Box>
              <Box mt={2} mb={5}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>SN</StyledTableCell>
                        <StyledTableCell>Time</StyledTableCell>
                        <StyledTableCell align="center">Event</StyledTableCell>
                        <StyledTableCell align="center">
                          Event Modifiers
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userGameData?.records?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((event: any, index: any) => (
                        <StyledTableRow key={event.time} hover={true}>
                          <StyledTableCell component="th" scope="row">
                            {index + 1}.
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {event.secondsFromStart -
                              userGameData?.records[0]?.secondsFromStart}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {event.eventName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {event.eventModifiers}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[10, 20, 40, 60]}
                    component="div"
                    count={userGameData?.records?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              </Box>
            </Box>
          </Box>
        </Container>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default UserData;
