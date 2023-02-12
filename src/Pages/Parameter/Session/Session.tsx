import React from "react";
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
import "./Session.css";
import { GameModeParameters } from "../../../interface/interface";

interface Props {
  gameModeParameters: GameModeParameters;
  setParameters: (value: GameModeParameters) => void;
  createMode: Boolean;
  onCreateParameter: () => void;
  openConfirm: boolean;
  setOpenConfirm: (value: boolean) => void;
}

const Session = (props: Props) => {
  const { gameModeParameters, setParameters, createMode,  onCreateParameter, openConfirm, setOpenConfirm } = props;
  const numberOfWave = Array.from({ length: 20 }, (v, k) => k + 1);
  const [enableSave, setEnableSave] = React.useState(false);

  const onWaveChange = (event: any) => {
    const updatedAccuracies = Array.from(
      Array(event.target.value),
      (_, index) => {
        return {
          ...gameModeParameters.session.accuracies[0],
          wave: index + 1,
        };
      }
    );

    setParameters({
      ...gameModeParameters,
      session: {
        ...gameModeParameters.session,
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
      const copy = [...gameModeParameters.session.accuracies];
      copy[index].AICorrectProbability = newValue;
      setParameters({
        ...gameModeParameters,
        session: {
          ...gameModeParameters.session,
          accuracies: copy,
        },
      });
    } else {
      const copy = [...gameModeParameters.session.accuracies];
      copy[index].humanCorrectProbability = newValue;
      setParameters({
        ...gameModeParameters,
        session: {
          ...gameModeParameters.session,
          accuracies: copy,
        },
      });
    }
  };

  const handleClose = () => {
    setOpenConfirm(false);
  };
  const handleConfirm = () => {
    setOpenConfirm(false);
    console.log(gameModeParameters);
    // TODO: API POST REQUEST 
  }
  React.useEffect(() => {
  }, [gameModeParameters.session]);
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
                value={gameModeParameters.session.maxWaves}
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
        {gameModeParameters.session.accuracies.map((_, i) => {
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
                    gameModeParameters.session.accuracies[i]
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
                    gameModeParameters.session.accuracies[i]
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
              onChange={(event: Event, newValue: number,) => {
                setEnableSave(true);
                setParameters({
                    ...gameModeParameters,
                    session: {
                      ...gameModeParameters.session,
                      penalty: newValue
                    },
                  });
              }}
              value={gameModeParameters.session.penalty}
            />
          </Grid>
          <Grid item xs={3}>
            <InputSlider
              silderName="Malicious Packet Probability"
              min={0.00}
              max={1.00}
              step={0.01}
              textFontSize={12}
              onChange={(event: Event, newValue: number,) => {
                setEnableSave(true);
                setParameters({
                    ...gameModeParameters,
                    session: {
                      ...gameModeParameters.session,
                      maliciousPacketProbability: newValue
                    },
                  });
              }}
              value={gameModeParameters.session.maliciousPacketProbability}
            />
          </Grid>
          <Grid item xs={3}>
            <InputSlider
              silderName="Interval Between Packets"
              min={0.00}
              max={2.00}
              step={0.01}
              textFontSize={12}
              onChange={(event: Event, newValue: number,) => {
                setEnableSave(true);
                setParameters({
                    ...gameModeParameters,
                    session: {
                      ...gameModeParameters.session,
                      intervalBetweenPackets: newValue
                    },
                  });
              }}
              value={gameModeParameters.session.intervalBetweenPackets}
            />
          </Grid>
        </Grid>
        <Grid container spacing={33}>
          <Grid item xs={3}>
            <InputSlider
              silderName="Max Number of Packets"
              min={0.00}
              max={200.00}
              step={20}
              textFontSize={12}
              onChange={(event: Event, newValue: number,) => {
                setEnableSave(true);
                setParameters({
                    ...gameModeParameters,
                    session: {
                      ...gameModeParameters.session,
                      maxNumberOfPackets: newValue
                    },
                  });
              }}
              value={gameModeParameters.session.maxNumberOfPackets}
            />
          </Grid>
          <Grid item xs={3}>
            <InputSlider
              silderName="Minimum Interval Between Rule Changes"
              min={0.00}
              max={200.00}
              step={20}
              textFontSize={12}
              onChange={(event: Event, newValue: number,) => {
                setEnableSave(true);
                setParameters({
                    ...gameModeParameters,
                    session: {
                      ...gameModeParameters.session,
                      minIntervalBetweenRuleChanges: newValue
                    },
                  });
              }}
              value={gameModeParameters.session.minIntervalBetweenRuleChanges}
            />
          </Grid>
          <Grid item xs={3}>
            <InputSlider
              silderName="Maximum Interval Between Rule Changes"
              min={0.00}
              max={400.00}
              step={20}
              textFontSize={12}
              onChange={(event: Event, newValue: number,) => {
                setEnableSave(true);
                setParameters({
                    ...gameModeParameters,
                    session: {
                      ...gameModeParameters.session,
                      maxIntervalBetweenRuleChanges: newValue
                    },
                  });
              }}
              value={gameModeParameters.session.maxIntervalBetweenRuleChanges}
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
              onChange={(event: Event, newValue: number,) => {
                setEnableSave(true);
                setParameters({
                    ...gameModeParameters,
                    session: {
                      ...gameModeParameters.session,
                      minHumanAdviceTimeInSeconds: newValue
                    },
                  });
              }}
              value={gameModeParameters.session.minHumanAdviceTimeInSeconds}
            />
          </Grid>
          <Grid item xs={3}>
            <InputSlider
              silderName="Maximum Human Advice Time (sec.)"
              min={0.00}
              max={60.00}
              step={1}
              textFontSize={12}
              onChange={(event: Event, newValue: number,) => {
                setEnableSave(true);
                setParameters({
                    ...gameModeParameters,
                    session: {
                      ...gameModeParameters.session,
                      maxHumanAdviceTimeInSeconds: newValue
                    },
                  });
              }}
              value={gameModeParameters.session.maxHumanAdviceTimeInSeconds}
            />
          </Grid>
          <Grid item xs={3}>
            <InputSlider
              silderName="Minimum AI Advice Time (sec.)"
              min={0.00}
              max={20.00}
              step={1}
              textFontSize={12}
              onChange={(event: Event, newValue: number,) => {
                setEnableSave(true);
                setParameters({
                    ...gameModeParameters,
                    session: {
                      ...gameModeParameters.session,
                      minAIAdviceTimeInSeconds: newValue
                    },
                  });
              }}
              value={gameModeParameters.session.minAIAdviceTimeInSeconds}
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
              onChange={(event: Event, newValue: number,) => {
                setEnableSave(true);
                setParameters({
                    ...gameModeParameters,
                    session: {
                      ...gameModeParameters.session,
                      maxAIAdviceTimeInSeconds: newValue
                    },
                  });
              }}
              value={gameModeParameters.session.maxAIAdviceTimeInSeconds}
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
              onChange={(event: Event, newValue: number,) => {
                setEnableSave(true);
                setParameters({
                    ...gameModeParameters,
                    session: {
                      ...gameModeParameters.session,
                      AIRandomSeed: newValue
                    },
                  });
              }}
              value={gameModeParameters.session.AIRandomSeed}
            />
          </Grid>
          <Grid item xs={3}>
            <InputSlider
              silderName="Human Random Seed"
              min={0}
              max={99999}
              step={1}
              textFontSize={12}
              onChange={(event: Event, newValue: number,) => {
                setEnableSave(true);
                setParameters({
                    ...gameModeParameters,
                    session: {
                      ...gameModeParameters.session,
                      humanRandomSeed: newValue
                    },
                  });
              }}
              value={gameModeParameters.session.humanRandomSeed}
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
              onChange={(event: Event, newValue: number,) => {
                setEnableSave(true);
                setParameters({
                    ...gameModeParameters,
                    session: {
                      ...gameModeParameters.session,
                      difficultyRatio: newValue
                    },
                  });
              }}
              value={gameModeParameters.session.difficultyRatio}
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
          <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {createMode? <>Create parameter?</> : <>Save <b>session</b> parameters changes?</>}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={createMode ? onCreateParameter:handleConfirm} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* <Box className="alertContainer">
    <Alert className="alert" severity="success">Your changes have been successfully saved!</Alert>
    <Alert className="alert" severity="error">Opps! Something went wrong!</Alert>
    </Box> */}
    </Box>
  );
};

export default Session;
