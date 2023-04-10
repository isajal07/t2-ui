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
  Link,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import "./Game.css";
import ResponsiveAppBar from "../../Components/AppBar/AppBar";
const T2 = require("./T2.png");

const Game = () => {
  const [settings, setSettings] = React.useState<any>({});
  const [listOfSettings, setListOfSettings] = React.useState([]);

  const [study, setStudy] = React.useState<any>({});
  const [listOfstudy, setListOfStudy] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<Boolean>(true);
  const [numberOfSettings, setNumberOfSettings] = React.useState<number>(1);
  // const [updatedSettingNumber, setUpdatedSettingNumber] = React.useState<number | null>(null);
  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}api/getStudies`).then((response) => {
      setListOfStudy(response.data);
      setStudy(response.data.find((param: any) => param.isSelected === true));
    });
    setNumberOfSettings(study?.numberOfSettings);
    axios.get(`${process.env.REACT_APP_API_URL}api/getSettings`).then((response) => {
      setListOfSettings(response.data);
      });
        setIsLoading(false);
      }, [study?.numberOfSettings]);

  const onStudySelect = async (event: any) => {
    setStudy(event.target.value);
    await axios
      .put(`${process.env.REACT_APP_API_URL}api/selectStudy/${event.target.value._id}`)
      .then((response) => {
        setNumberOfSettings(response.data.numberOfSettings);
      });
  };
  return (
    <div className="Game">
      <ResponsiveAppBar />
      {isLoading ? 
      <Box textAlign={"center"}>
        <Box mt={10}>Loading...</Box>
        <Box mt={2}><CircularProgress size={25} /></Box>
        </Box> :
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
            <Grid item xs={6} mt={1}>
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
            <Grid>
           {Array.from({length: numberOfSettings}, (x, i) => i).map((a,i) =>
            <Grid item xs={6} mt={0.7}>
              <FormControl size="small">
                <Grid container>
                  <Grid item xs={9}>
                    <Typography mt={1}>{i+1}. Select Settings:</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Select
                      value={listOfSettings?.find((param: any) => param.isSelected === true && param.settingNumber === i+1 && param.study._id === study?._id)}
                      onChange={async(event: any) => {
                        await axios.put(`${process.env.REACT_APP_API_URL}api/selectSettings/${event.target.value._id}?studyId=${study._id}&settingNumber=${i+1}`).then((response) => {});
                        window.location.reload();
                      }}
                      sx={{ width: 200 }}
                    >
                      {listOfSettings?.filter((set:any) => set.study._id === study?._id)
                      .map((param) => (
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
         )}
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
                  <Link href="https://www.cse.unr.edu/~sushil/taiser/Exp/" target="_blank"> TAISER Files Directory</Link>
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
}
    </div>
  );
};

export default Game;
