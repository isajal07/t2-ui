import React from "react";
import axios from "axios";
import "./Game.css";
import {
  Box,
  Button,
  Typography,
  Grid,
  Modal,
  TextField,
  Container,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import "./Game.css";
import ResponsiveAppBar from "../../Components/AppBar/AppBar";
const T2 = require("./T2.png");

const Game = () => {
  const [parameters, setParameters] = React.useState<any>({});
  const [listOfParameters, setListOfParameters] = React.useState([]);

  const [study, setStudy] = React.useState<any>({});
  const [listOfstudy, setListOfStudy] = React.useState<any>([]);

  React.useEffect(() => {
    axios.get("http://localhost:5001/api/getParameters").then((response) => {
      setListOfParameters(response.data);
      setParameters(
        response.data.find((param: any) => param.isSelected === true)
      );
    });

    axios.get("http://localhost:5001/api/getStudies").then((response) => {
      setListOfStudy(response.data);
      setStudy(response.data.find((param: any) => param.isSelected === true));
    });
  }, []);

  const onParameterSelect = async (event: any) => {
    setParameters(event.target.value);
    await axios
      .put(
        `http://localhost:5001/api/selectParameter/${event.target.value._id}`
      )
      .then((response) => {});
  };

  const onStudySelect = async (event: any) => {
    setStudy(event.target.value);
    await axios
      .put(`http://localhost:5001/api/selectStudy/${event.target.value._id}`)
      .then((response) => {});
  };

  console.log(parameters);
  return (
    <div className="Game">
      <ResponsiveAppBar />
      <Container>
        <Box>
        <Box m={10}>
          <Card>
              <CardMedia
                component="img"
                height="300"
                image={T2}
                alt="T2 screenshot"
              />
              <CardContent>
              <Box textAlign={"center"}>
              <Typography gutterBottom variant="h5" component="div">
                  T2
                </Typography>
                </Box>
          <Grid container>
            <Grid item xs={6}>
              <FormControl size="small">
                <Grid container>
                  <Grid item xs={5}>
                    <Typography mt={1}>Select Parameter:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Select
                      value={parameters}
                      onChange={onParameterSelect}
                      sx={{ width: 200 }}
                    >
                      {listOfParameters?.map((param) => (
                        //@ts-ignore
                        <MenuItem key={param._id} value={param}>
                          {/* @ts-ignore */}
                          {param.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl size="small">
                <Grid container>
                  <Grid item xs={5}>
                    <Typography mt={1}>Select Study:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Select
                      value={study}
                      onChange={onStudySelect}
                      sx={{ width: 200 }}
                    >
                      {listOfstudy?.map((study: any) => (
                        //@ts-ignore
                        <MenuItem key={study._id} value={study}>
                          {study.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </FormControl>
              <Button></Button>
            </Grid>
          </Grid>
          <Box textAlign="center" mt={2}>
            <Button
              variant="contained"
              sx={{ padding: "4px 40px" }}
              target="_blank"
              href="https://www.cse.unr.edu/~sajal/t2/1/"
            >
              Start T2
            </Button>
          </Box>
          </CardContent>
          </Card>
        </Box>
        {/* TAISER */}
        <Box m={10}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image={T2}
                alt="T2 screenshot"
              />
              <CardContent>
                <Box textAlign={"center"}>
                       <Typography gutterBottom variant="h5" component="div">
                  TAISER
                </Typography>
                </Box>
          <Box textAlign="center" mt={2}>
            <Button
              variant="contained"
              sx={{ padding: "4px 40px" }}
              target="_blank"
              href="https://www.cse.unr.edu/~sushil/taiser/Every/"
            >
              Start TAISER
            </Button>
          </Box>
          </CardContent>
            </CardActionArea>
          </Card>
        </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Game;
