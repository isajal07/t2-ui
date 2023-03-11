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
import { CSVLink, CSVDownload } from "react-csv";
import { DateTime } from "luxon";
import ResponsiveAppBar from "../../../Components/AppBar/AppBar";

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
  // const { studyDataId, studyDataName } = useParams();
  const [userGameData, setUserGameData] = React.useState<any>({});
  const [csvData, setCsvData] = React.useState<any>([
    ["Alias Name: ", "sajal"],
    ["Black hate score: ", "000.343"],
    ["White hate score: ", "000.343"],
    ["Created at: ", "2022/23/22"],
    ["Settings: ", "dfsfsdfs"],
    ["Study: ", "sdfsdfs"],
    ["Time", "Event", "Rule", "Building", "Advisor", "Latency"],
    ["0027.2", "setNewMaliciousRule", "", "North-East", "Human", ""],
    ["0027.2", "setNewMaliciousRule", "", "North-East", "Human", ""],
    ["0027.2", "setNewMaliciousRule", "", "North-East", "Human", ""],
    ["0027.2", "setNewMaliciousRule", "", "North-East", "Human", ""],
  ]);
  
  const formatUserGameData = (userGameData: any) => {
    let { name, createdAt, whitehatScore, blackhatScore, records, settingsId } =
    userGameData;
    
    //Convert eventModifiers to array
    records = records.map((rec:any) => {
      return {
        ...rec,
        eventModifiers: [rec.eventModifiers]
      }
    });
    
    //Split eventModifier
    records = records.map((rec: any) => {
      return {
        ...rec,
        eventModifiers: rec.eventModifiers[0].split(","),
      };
    });
    
    records = records.map((rec: any) => {
      //Add bulding enum
      const build =
      rec.eventModifiers.includes("North East Side") ||
      rec.eventModifiers.includes("South West Side");
      const buildingEnum =
      build && rec.eventModifiers[0] === "North East Side" ? 1 : 2;
      
      //Add advisor
      const advisorExist =
      rec.eventModifiers[0] === "Human" || rec.eventModifiers[0] === "AI";
      const advisorEnum =
      advisorExist && rec.eventModifiers[0] === "AI" ? 1 : 2;
      
      //Add rule
      const ruleExist =
      rec.eventModifiers[0] === "Small" ||
      rec.eventModifiers[0] === "Medium" ||
      rec.eventModifiers[0] === "Large";
      const rules = ruleExist && rec.eventModifiers.slice(0, 3).toString();
      const buildingRules = ruleExist && rec.eventModifiers[3];
      
      //Add latency
      const latencyExist =
      rec.eventModifiers.length === 3 &&
      rec.eventModifiers[1].includes("latency");
      
      return {
        time: rec.secondsFromStart,
        eventName: latencyExist ? rec.eventModifiers[1] : rec.eventName,
        ...(build && { building: buildingEnum }),
        ...(advisorExist && { advisor: advisorEnum }),
        ...(ruleExist && { rules: rules }),
        ...(ruleExist && { building: buildingRules }),
        ...(latencyExist && { latency: rec.eventModifiers[2] }),
      };
    });
    
    return { name, createdAt, whitehatScore, blackhatScore, records, settingsId } 
  };
  
  // userGameData && console.log(formatUserGameData(userGameData))
  
  const createdAt = userGameData && DateTime.fromISO(userGameData.createdAt).toLocaleString(DateTime.DATETIME_MED);

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/getUserGameData/${userGameDataId}`
      )
      .then((response) => {
        setUserGameData(formatUserGameData(response.data));
      });
    }, [userGameDataId]);
    
  const getBuildingName = (buldingEnum: Number) => {
    if (buldingEnum === 1) {
      return "North-East";
    } else if (buldingEnum === 2) {
      return "South-West";
    } else {
      return "";
    }
  };
  const getAdvisorName = (advisorEnum: Number) => {
    if (advisorEnum === 1) {
      return "AI";
    } else if (advisorEnum === 2){
      return "Human";
    } else {
      return "";
    }
  };

  return (
    <Box>
      <ResponsiveAppBar />
      {userGameData ? (
        <Container>
          <Box mt={3}>
          <Grid container>
          <Grid item xs={4}>
            <Typography><b>Alias name:</b> {userGameData.name} </Typography>
            <Typography><b>Created at:</b> {createdAt}</Typography>
            </Grid>
            <Grid item xs={4}>
            <Typography><b>White Hat Score:</b> {userGameData.whitehatScore}</Typography>
            <Typography><b>Black Hat Score:</b> {userGameData.blackhatScore}</Typography>
            </Grid>
            <Grid item xs={4}>
            <Typography><b>Settings</b>: {userGameData.settingsId}</Typography>
            <Typography><b>Study:</b> {studyDataName}</Typography>

            </Grid>
            <Box mt={1}>
              <CSVLink
                filename={`${userGameData.name}-${createdAt}.csv`}
                data={csvData}
              >
                <Typography>Download CSV ⬇</Typography>
              </CSVLink>
            </Box>
            </Grid>
            <Box>
              <Box mt={2} mb={5}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                      <StyledTableCell>SN</StyledTableCell>
                        <StyledTableCell>Time</StyledTableCell>
                        <StyledTableCell align="center">Event</StyledTableCell>
                        <StyledTableCell align="center">Rule</StyledTableCell>
                        <StyledTableCell align="center">
                          Building
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Advisor
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Latency
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userGameData?.records?.map((event: any, index: any) => (
                        <StyledTableRow key={event.time} hover={true}>
                          <StyledTableCell component="th" scope="row">
                            {index}.
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {event.time}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {event.eventName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {event.rules}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {getBuildingName(event.building)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {getAdvisorName(event.advisor)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {event.latency}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
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
