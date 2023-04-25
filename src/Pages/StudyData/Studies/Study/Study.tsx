import React from "react";
import axios from "axios";
import "./Study.css";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import ResponsiveAppBar from "../../../../Components/AppBar/AppBar";
import DownloadIcon from "@mui/icons-material/Download";
import Divider from "@mui/material/Divider";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CsvDownloadButton from "react-json-to-csv";

const Study = () => {
  const { studyDataId, studyDataName } = useParams();
  const [studyData, setStudyData] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/getUserGameData/studyId/${studyDataId}`
      )
      .then((response) => {
        setStudyData(response.data);
      });
  }, []);
  const onRowClick = (userGameData: any) => {
    navigate(`./userGameData/${userGameData._id}`);
  };

  return (
    <Box mb={6}>
      <ResponsiveAppBar />
      {studyData ? (
        <Container>
          <Box mt={2}>
            <Box mb={2}>
              <Typography fontSize={30}> {studyDataName}:</Typography>
            </Box>
            <Grid container>
              <Grid item xs={2}>
                <Typography ml={2}>SN. </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography ml={4}>Alias Name</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography ml={2}>Group</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography ml={1}>View Data</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography ml={2}>Download</Typography>
              </Grid>
            </Grid>
            <Divider />
            <Box>
              {studyData.map((study: any, index: any) => (
                <Grid container className="data" ml={2} mt={1}>
                  <Grid item xs={2}>
                    <Typography ml={1} mt={1}>
                      {index + 1}.{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography ml={2} mt={1}>
                      {study.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography ml={2} mt={1}>
                      {study.group}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography ml={1}>
                      <IconButton
                        aria-label="view data"
                        onClick={() => onRowClick(study)}
                      >
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography ml={2}>
                      <IconButton aria-label="download data">
                        <CsvDownloadButton
                          data={study.records.map((rec: any)=> {
                            return {
                              Time: (rec.secondsFromStart - study.records[0].secondsFromStart).toFixed(4),
                              Event: rec.eventName,
                              EventModifiers: rec.eventModifiers
                            }
                          })}
                          filename={`${study.name}.csv`}
                          style={{
                            background: "none",
                            border: "none",
                          }}
                        >
                          <DownloadIcon />
                        </CsvDownloadButton>
                      </IconButton>
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Box>
        </Container>
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
};

export default Study;
