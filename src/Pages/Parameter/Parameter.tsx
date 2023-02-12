import React from "react";
import axios from "axios";
import "./Parameter.css";
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
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ResponsiveAppBar from "../../Components/AppBar/AppBar";
import Training from "./Training/Training";
import Session from "./Session/Session";
import { GameModeParameters, defaultParameters } from '../../interface/interface';
import CircularProgress from "@mui/material/CircularProgress";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Parameter = () => {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [listOfParameters, setListOfParameters] = React.useState<GameModeParameters[]>([]);
  const [ parameters, setParameters ] = React.useState<GameModeParameters>(defaultParameters);
  const [enableCreateParameterButton, setEnableCreateParameterButton] = React.useState(false);
  const [createMode, setCreateMode] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpenCreateParameter = () => {
    setOpen(true);
    setParameters(defaultParameters);
  }
  const handleSidlerChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };

  React.useEffect(() => {
      axios.get("http://localhost:5001/api/getParameters").then((response) => {
        setListOfParameters(response.data)
        setParameters(response.data.find((param:any) => param.isSelected === true))
      });
  }, []);

  const onCreateParameterButton = () => {
    setOpen(false);
    setCreateMode(true);
  };

  const onCreateParameter = async () => {
    setOpenConfirm(false)
    await axios
      .post("http://localhost:5001/api/createParameters", parameters)
      .then((response) => {
        setParameters(response.data);
      });
      window.location.reload();
  };

  const onParameterSelect = (event:any) => {
    setParameters(event.target.value);
  };
  return (
    <div className="Parameter">
      <ResponsiveAppBar />
      <Container>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box>
              <TextField
                required
                fullWidth
                id="outlined-basic"
                label="Enter parameter name"
                variant="outlined"
                color="primary"
                size="small"
                value={parameters.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.value) {
                    setEnableCreateParameterButton(true);
                  } else {
                    setEnableCreateParameterButton(false);
                  }
                  setParameters({ ...parameters, name: event.target.value });
                }}
              />
            </Box>
            <Box mt={2}>
              <TextField
              fullWidth
                id="outlined-multiline-static"
                multiline
                size="small"
                rows={3}
                variant="outlined"
                label="Enter note..."
                value={parameters.note}
                onChange={(event) => {
                  setParameters({ ...parameters, note: event.target.value });
                }}
              />
            </Box>
            <Box textAlign="center" mt={2}>
              <Button
                variant="contained"
                sx={{ padding: "4px 40px" }}
                onClick={onCreateParameterButton}
                disabled={!enableCreateParameterButton}
              >
                Create Parameter
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>  


      <Grid container mt={3}>
        <Grid item xs={10}>
        
        <FormControl size="small">
          <Grid container>
            <Grid item xs={5}>
              <Typography mt={1}>Parameter(s):</Typography>
            </Grid>
            <Grid item xs={7}>
              <Select
                value={parameters}
                onChange={onParameterSelect}
                sx={{ width: 200 }}
              >
                {listOfParameters?.map((param) => (
                  //@ts-ignore
                  <MenuItem value={param}>{param.name}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </FormControl>

        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            sx={{ padding: "4px 12px" }}
            onClick={handleOpenCreateParameter}
          >
            Create parameter
          </Button>
        </Grid>
      </Grid>

      <Box mt={2}><Typography fontSize={30}>{parameters?.name}</Typography></Box>
      {parameters?.note && <Box><Typography fontStyle={"italic"}>Note: {parameters?.note}</Typography></Box>}
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleSidlerChange}
              aria-label="basic tabs example"
            >
              <Tab label="Training" {...a11yProps(0)} />
              <Tab label="Session" {...a11yProps(1)} />
            </Tabs>
          </Box>
          { parameters ?
          <>
          <TabPanel value={value} index={0}>
            <Training gameModeParameters={parameters} setParameters={setParameters} createMode={createMode} onCreateParameter={onCreateParameter} openConfirm={openConfirm} setOpenConfirm={setOpenConfirm}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Session gameModeParameters={parameters} setParameters={setParameters} createMode={createMode} onCreateParameter={onCreateParameter} openConfirm={openConfirm} setOpenConfirm={setOpenConfirm}/>
          </TabPanel>
          </>
          :
            <Box textAlign="center" mt={4}>
                <Box><CircularProgress size={25} /></Box>
                <Box mt={2}>Loading parameters...</Box>
            </Box>
}
        </Box>
      </Container>
    </div>
  );
}

export default Parameter;
