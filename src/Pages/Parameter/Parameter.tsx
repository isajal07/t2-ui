import React from "react";
import "./Parameter.css";
import { Container, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import ResponsiveAppBar from "../../Components/AppBar/AppBar";
import Training from "./Training/Training";
import Session from "./Session/Session";
import { GameModeParameters } from '../../interface/interface';

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

const Parameter = () => {
  const pp = {
    training: {
        maxWaves: 2,
        accuracies: [
          {
            wave: 1,
            AICorrectProbability: 0.8,
            humanCorrectProbability: 0.8,
          },
          {
            wave: 2,
            AICorrectProbability: 0.8,
            humanCorrectProbability: 0.8,
          },
        ],
        penalty: 15,
        maliciousPacketProbability: 0.25,
        intervalBetweenPackets: 0.5,
        maxNumberOfPackets: 500,
        minIntervalBetweenRuleChanges: 23,
        maxIntervalBetweenRuleChanges: 40,
        minHumanAdviceTimeInSeconds: 4,
        maxHumanAdviceTimeInSeconds: 4,
        minAIAdviceTimeInSeconds: 4,
        maxAIAdviceTimeInSeconds: 4,
        AIRandomSeed: 4583,
        humanRandomSeed: 66305,
        difficultyRatio: 0.8,
      },
    session: {
        maxWaves: 1,
        accuracies: [
          {
            wave: 1,
            AICorrectProbability: 0.8,
            humanCorrectProbability: 0.8,
          },
        ],
        penalty: 15,
        maliciousPacketProbability: 0.25,
        intervalBetweenPackets: 0.5,
        maxNumberOfPackets: 500,
        minIntervalBetweenRuleChanges: 23,
        maxIntervalBetweenRuleChanges: 40,
        minHumanAdviceTimeInSeconds: 4,
        maxHumanAdviceTimeInSeconds: 4,
        minAIAdviceTimeInSeconds: 4,
        maxAIAdviceTimeInSeconds: 4,
        AIRandomSeed: 4583,
        humanRandomSeed: 66305,
        difficultyRatio: 0.8,
      },
    };
  const [value, setValue] = React.useState(0);
  const [ parameters, setParameters ] = React.useState<GameModeParameters>(pp);

  const handleSidlerChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <div className="Parameter">
      <ResponsiveAppBar />
      <Container>
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
          <TabPanel value={value} index={0}>
            <Training gameModeParameters={parameters} setParameters={setParameters}/>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Session gameModeParameters={parameters} setParameters={setParameters}/>
          </TabPanel>
        </Box>
      </Container>
    </div>
  );
}

export default Parameter;
