import React from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputSlider from "../../../Components/Slider/Slider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import "./Training.css";
import { GameModeSettings } from "../../../interface/interface";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  gameModeSettings: GameModeSettings;
  setSettings: (value: GameModeSettings) => void;
  createMode: Boolean;
  onCreateSettings: () => void;
  openConfirm: boolean;
  setOpenConfirm: (value: boolean) => void;
}

const Training = (props: Props) => {
  const { gameModeSettings, setSettings, createMode, onCreateSettings, openConfirm, setOpenConfirm } = props;
  const numberOfWave = Array.from({ length: 20 }, (v, k) => k + 1);
  const [enableSave, setEnableSave] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onWaveChange = (event: any) => {
    setEnableSave(true);
    const updatedAccuracies = Array.from(
      Array(event.target.value),
      (_, index) => {
        return {
          ...gameModeSettings.training.accuracies[0],
          wave: index + 1,
        };
      }
    );

    setSettings({
      ...gameModeSettings,
      training: {
        ...gameModeSettings.training,
        maxWaves: event.target.value,
        accuracies: updatedAccuracies,
      },
    });
  };

  const onCorrectProbablityChange = (
    event: Event,
    newValue: number,
    activeThumb: number,
    index: number,
    humanOrAI: string
  ) => {
    setEnableSave(true);
    if (humanOrAI === "AICorrectProbability") {
      const copy = [...gameModeSettings.training.accuracies];
      copy[index].AICorrectProbability = newValue;
      setSettings({
        ...gameModeSettings,
        training: {
          ...gameModeSettings.training,
          accuracies: copy,
        },
      });
    } else {
      const copy = [...gameModeSettings.training.accuracies];
      copy[index].humanCorrectProbability = newValue;
      setSettings({
        ...gameModeSettings,
        training: {
          ...gameModeSettings.training,
          accuracies: copy,
        },
      });
    }
  };

  const handleClose = () => {
    setOpenConfirm(false);
  };
  const handleConfirm = async () => {
    setLoading(true);
    setOpenConfirm(false);
    setLoading(false);

    await axios
      .put(`http://localhost:5001/api/updateSettings/${gameModeSettings._id}`, gameModeSettings)
      .then((response) => {
        console.log(response.data);
      });
    setEnableSave(false);
    console.log(gameModeSettings);
     
  };

  React.useEffect(() => {
    if(createMode) setEnableSave(true);
  }, [createMode]);
  const onSaveClicked = () => {
    setOpenConfirm(true);
  };
  return (
    <Box>
      <Box>
        <Divider sx={{ marginBottom: 2 }}>
          <Chip label="WAVE & ACCURACY" />
        </Divider>
        <FormControl size="small">
          <Grid container>
            <Grid item xs={6}>
              <Typography mt={1}>Select number of waves</Typography>
            </Grid>
            <Grid item xs={6}>
              <Select
                value={gameModeSettings.training.maxWaves}
                onChange={onWaveChange}
                sx={{ width: 200 }}
              >
                {numberOfWave.map((wave) => (
                  <MenuItem value={wave}>{wave}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </FormControl>
      </Box>

      <Box padding={2}>
        {gameModeSettings.training.accuracies.map((_, i) => {
          return (
            <Grid container>
              <Grid item xs={1}>
                <Typography fontSize={13} pt={3}>
                  {i + 1}.
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <InputSlider
                  silderName="AI Correct Probability"
                  min={0.00}
                  max={1.00}
                  step={0.01}
                  textFontSize={12}
                  onChange={(
                    event: Event,
                    newValue: number,
                    activeThumb: number
                  ) =>
                    onCorrectProbablityChange(
                      event,
                      newValue,
                      activeThumb,
                      i,
                      "AICorrectProbability"
                    )
                  }
                  value={
                    gameModeSettings.training.accuracies[i]
                      .AICorrectProbability
                  }
                />
              </Grid>
              <Grid item xs={5}>
                <InputSlider
                  silderName="Human Correct Probability"
                  min={0.00}
                  max={1.00}
                  step={0.01}
                  textFontSize={12}
                  onChange={(
                    event: Event,
                    newValue: number,
                    activeThumb: number
                  ) =>
                    onCorrectProbablityChange(
                      event,
                      newValue,
                      activeThumb,
                      i,
                      "humanCorrectProbability"
                    )
                  }
                  value={
                    gameModeSettings.training.accuracies[i]
                      .humanCorrectProbability
                  }
                />
              </Grid>
            </Grid>
          );
        })}
      </Box>

      <Box>
        <Divider sx={{ marginBottom: 2, marginTop: 2 }}>
          <Chip label="SPEED & DIFFICULTY" />
        </Divider>
        <Grid container spacing={33}>
          <Grid item xs={3}>
            <InputSlider
              silderName="Penalty"
              min={1}
              max={10}
              step={1}
              textFontSize={12}
              onChange={(event: Event, newValue: number) => {
                setEnableSave(true);
                setSettings({
                  ...gameModeSettings,
                  training: {
                    ...gameModeSettings.training,
                    penalty: newValue,
                  },
                });
              }}
              value={gameModeSettings.training.penalty}
            />
          </Grid>
          <Grid item xs={3}>
            <InputSlider
              silderName="Malicious Packet Probability"
              min={0.00}
              max={1.00}
              step={0.01}
              textFontSize={12}
              onChange={(event: Event, newValue: number) => {
                setEnableSave(true);
                setSettings({
                  ...gameModeSettings,
                  training: {
                    ...gameModeSettings.training,
                    maliciousPacketProbability: newValue,
                  },
                });
              }}
              value={gameModeSettings.training.maliciousPacketProbability}
            />
          </Grid>
          <Grid item xs={3}>
            <InputSlider
              silderName="Interval Between Packets"
              min={0.00}
              max={2.00}
              step={0.01}
              textFontSize={12}
              onChange={(event: Event, newValue: number) => {
                setEnableSave(true);
                setSettings({
                  ...gameModeSettings,
                  training: {
                    ...gameModeSettings.training,
                    intervalBetweenPackets: newValue,
                  },
                });
              }}
              value={gameModeSettings.training.intervalBetweenPackets}
            />
          </Grid>
        </Grid>
        <Grid container spacing={33}>
          <Grid item xs={3}>
            <InputSlider
              silderName="Max Number of Packets"
              min={0}
              max={500}
              step={1}
              textFontSize={12}
              onChange={(event: Event, newValue: number) => {
                setEnableSave(true);
                setSettings({
                  ...gameModeSettings,
                  training: {
                    ...gameModeSettings.training,
                    maxNumberOfPackets: newValue,
                  },
                });
              }}
              value={gameModeSettings.training.maxNumberOfPackets}
            />
          </Grid>
          <Grid item xs={3}>
            <InputSlider
              silderName="Minimum Interval Between Rule Changes"
              min={0.00}
              max={200.00}
              step={20}
              textFontSize={12}
              onChange={(event: Event, newValue: number) => {
                setEnableSave(true);
                setSettings({
                  ...gameModeSettings,
                  training: {
                    ...gameModeSettings.training,
                    minIntervalBetweenRuleChanges: newValue,
                  },
                });
              }}
              value={gameModeSettings.training.minIntervalBetweenRuleChanges}
            />
          </Grid>
          <Grid item xs={3}>
            <InputSlider
              silderName="Maximum Interval Between Rule Changes"
              min={0.00}
              max={400.00}
              step={20}
              textFontSize={12}
              onChange={(event: Event, newValue: number) => {
                setEnableSave(true);
                setSettings({
                  ...gameModeSettings,
                  training: {
                    ...gameModeSettings.training,
                    maxIntervalBetweenRuleChanges: newValue,
                  },
                });
              }}
              value={gameModeSettings.training.maxIntervalBetweenRuleChanges}
            />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Divider sx={{ marginBottom: 2, marginTop: 2 }}>
          <Chip label="ADVICE" />
        </Divider>
        <Grid container spacing={33}>
          <Grid item xs={3}>
            <InputSlider
              silderName="Minimum Human Advice Time (sec.)"
              min={0.00}
              max={60.00}
              step={1}
              textFontSize={12}
              onChange={(event: Event, newValue: number) => {
                setEnableSave(true);
                setSettings({
                  ...gameModeSettings,
                  training: {
                    ...gameModeSettings.training,
                    minHumanAdviceTimeInSeconds: newValue,
                  },
                });
              }}
              value={gameModeSettings.training.minHumanAdviceTimeInSeconds}
            />
          </Grid>
          <Grid item xs={3}>
            <InputSlider
              silderName="Maximum Human Advice Time (sec.)"
              min={0.00}
              max={60.00}
              step={1}
              textFontSize={12}
              onChange={(event: Event, newValue: number) => {
                setEnableSave(true);
                setSettings({
                  ...gameModeSettings,
                  training: {
                    ...gameModeSettings.training,
                    maxHumanAdviceTimeInSeconds: newValue,
                  },
                });
              }}
              value={gameModeSettings.training.maxHumanAdviceTimeInSeconds}
            />
          </Grid>
          <Grid item xs={3}>
            <InputSlider
              silderName="Minimum AI Advice Time (sec.)"
              min={0.00}
              max={20.00}
              step={1}
              textFontSize={12}
              onChange={(event: Event, newValue: number) => {
                setEnableSave(true);
                setSettings({
                  ...gameModeSettings,
                  training: {
                    ...gameModeSettings.training,
                    minAIAdviceTimeInSeconds: newValue,
                  },
                });
              }}
              value={gameModeSettings.training.minAIAdviceTimeInSeconds}
            />
          </Grid>
        </Grid>
        <Grid container spacing={33}>
          <Grid item xs={3}>
            <InputSlider
              silderName="Maximum AI Advice Time (sec.)"
              min={0.00}
              max={20.00}
              step={1}
              textFontSize={12}
              onChange={(event: Event, newValue: number) => {
                setEnableSave(true);
                setSettings({
                  ...gameModeSettings,
                  training: {
                    ...gameModeSettings.training,
                    maxAIAdviceTimeInSeconds: newValue,
                  },
                });
              }}
              value={gameModeSettings.training.maxAIAdviceTimeInSeconds}
            />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Divider sx={{ marginBottom: 2, marginTop: 2 }}>
          <Chip label="RANDOM SEEDS" />
        </Divider>
        <Grid container spacing={33}>
          <Grid item xs={3}>
            <InputSlider
              silderName="AI Random Seed"
              min={0}
              max={99999}
              step={1}
              textFontSize={12}
              onChange={(event: Event, newValue: number) => {
                setEnableSave(true);
                setSettings({
                  ...gameModeSettings,
                  training: {
                    ...gameModeSettings.training,
                    AIRandomSeed: newValue,
                  },
                });
              }}
              value={gameModeSettings.training.AIRandomSeed}
            />
          </Grid>
          <Grid item xs={3}>
            <InputSlider
              silderName="Human Random Seed"
              min={0}
              max={99999}
              step={1}
              textFontSize={12}
              onChange={(event: Event, newValue: number) => {
                setEnableSave(true);
                setSettings({
                  ...gameModeSettings,
                  training: {
                    ...gameModeSettings.training,
                    humanRandomSeed: newValue,
                  },
                });
              }}
              value={gameModeSettings.training.humanRandomSeed}
            />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Divider sx={{ marginBottom: 2, marginTop: 2 }}>
          <Chip label="TRAINING/SESSION" />
        </Divider>
        <Grid container spacing={33}>
          <Grid item xs={3}>
            <InputSlider
              silderName="Difficulty Ratio"
              min={0.00}
              max={1.00}
              step={0.1}
              textFontSize={12}
              onChange={(event: Event, newValue: number) => {
                setEnableSave(true);
                setSettings({
                  ...gameModeSettings,
                  training: {
                    ...gameModeSettings.training,
                    difficultyRatio: newValue,
                  },
                });
              }}
              value={gameModeSettings.training.difficultyRatio}
            />
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box mt={2} mb={15} sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          sx={{ padding: "4px 40px" }}
          onClick={onSaveClicked}
          disabled={!enableSave}
        >
          Save
        </Button>
      </Box>

      <div>
        <Dialog
          open={openConfirm}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {loading ? (
            <Box padding={8} pl={16} pr={16}>
              <Box pl={2}>
                <CircularProgress size={25} />
              </Box>
              <Typography> Saving... </Typography>
            </Box>
          ) : (
            <>
              <DialogTitle id="alert-dialog-title">{"Confrim"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {createMode? <>Create settings?</> : <>Save <b>training</b> settings changes?</>}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={createMode? onCreateSettings: handleConfirm} autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </div>

      {/* <Box className="alertContainer">
    <Alert className="alert" severity="success">Your changes have been successfully saved!</Alert>
    <Alert className="alert" severity="error">Opps! Something went wrong!</Alert>
    </Box> */}
    </Box>
  );
};

export default Training;
