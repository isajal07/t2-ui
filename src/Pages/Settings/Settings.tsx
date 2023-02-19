import React from "react";
import axios from "axios";
import "./Settings.css";
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
import { GameModeSettings, defaultSettings } from '../../interface/interface';
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

const Settings = () => {
  const admin = localStorage.getItem("token");
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [listOfSettings, setListOfSettings] = React.useState<GameModeSettings[]>([]);
  const [settings, setSettings] = React.useState<GameModeSettings>(defaultSettings);
  const [enableCreateSettingsButton, setEnableCreateSettingsButton] = React.useState(false);
  const [createMode, setCreateMode] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [createSettingsForm, setCreateSettingsForm] = React.useState({
    name: "",
    note: ""
  })
  const handleClose = () => setOpen(false);
  const handleOpenCreateSettings = () => {
    setOpen(true);
  }
  const handleSidlerChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };

  React.useEffect(() => {
      axios.get(`${process.env.REACT_APP_API_URL}api/getSettings`).then((response) => {
        setListOfSettings(response.data)
        setSettings(response.data.find((param:any) => param.isSelected === true))
      });
  }, []);

  const onCreateSettingsButton = () => {
    setOpen(false);
    setCreateMode(true);
    setSettings({...defaultSettings, name: createSettingsForm.name, note: createSettingsForm.note, createdBy: admin})
  };

  const onCreateSettings = async () => {
    setOpenConfirm(false)
    await axios
      .post(`${process.env.REACT_APP_API_URL}api/createSettings`, settings)
      .then((response) => {
        setSettings(response.data);
      });
      window.location.reload();
  };

  const onSettingsSelect = (event:any) => {
    setSettings(event.target.value);
  };
  console.log(settings)
  return (
    <div className="Settings">
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
                label="Enter settings name"
                variant="outlined"
                color="primary"
                size="small"
                // value={settings.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.value) {
                    setEnableCreateSettingsButton(true);
                  } else {
                    setEnableCreateSettingsButton(false);
                  }
                  // setSettings({ ...settings, name: event.target.value });
                  setCreateSettingsForm({...createSettingsForm, name: event.target.value})
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
                // value={settings.note}
                onChange={(event) => {
                  // setSettings({ ...settings, note: event.target.value });
                  setCreateSettingsForm({...createSettingsForm, note: event.target.value})
                }}
              />
            </Box>
            <Box textAlign="center" mt={2}>
              <Button
                variant="contained"
                sx={{ padding: "4px 40px" }}
                onClick={onCreateSettingsButton}
                disabled={!enableCreateSettingsButton}
              >
                Create Settings
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>  


      <Grid container mt={3}>
        <Grid item xs={10}>
        
        <FormControl size="small">
          <Grid container>
            <Grid item xs={4}>
              <Typography mt={1}>Settings:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Select
                value={settings}
                onChange={onSettingsSelect}
                sx={{ width: 200 }}
              >
                {listOfSettings?.map((param) => (
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
            onClick={handleOpenCreateSettings}
          >
            Create settings
          </Button>
        </Grid>
      </Grid>

      <Box mt={2}><Typography fontSize={30}>{settings?.name}</Typography></Box>
      <Grid container>
      {settings?.note && <Grid item xs={6}><Typography fontStyle={"italic"} fontSize={13}>Note: {settings?.note}</Typography></Grid>}
      <Grid item xs={6} textAlign={"right"}><Typography fontSize={13}>Created by: {settings?.createdBy}</Typography></Grid>
        </Grid>
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
          { settings ?
          <>
          <TabPanel value={value} index={0}>
            <Training gameModeSettings={settings} setSettings={setSettings} createMode={createMode} onCreateSettings={onCreateSettings} openConfirm={openConfirm} setOpenConfirm={setOpenConfirm}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Session gameModeSettings={settings} setSettings={setSettings} createMode={createMode} onCreateSettings={onCreateSettings} openConfirm={openConfirm} setOpenConfirm={setOpenConfirm}/>
          </TabPanel>
          </>
          :
            <Box textAlign="center" mt={4}>
                <Box><CircularProgress size={25} /></Box>
                <Box mt={2}>Loading settings...</Box>
            </Box>
}
        </Box>
      </Container>
    </div>
  );
}

export default Settings;
