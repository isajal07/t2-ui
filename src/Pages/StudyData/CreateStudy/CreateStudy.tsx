import React from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Grid,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel
} from "@mui/material";

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

const CreateStudy = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpenCreateStudy = () => setOpen(true);
  const admin = localStorage.getItem("token");
  const numberOfSettingsArray = [1,2,3,4,5,6,7,8,9,10];
  const [studyData, setStudyData] = React.useState({
    name: "",
    info: "",
    numberOfSettings: 1,
    createdBy: admin,
    createdAt: Date(),
  });
  const [enableCreateStudyButton, setEnableCreateStudyButton] =
    React.useState(false);
  const handleClose = () => setOpen(false);
  const onCreateStudy = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}api/createStudy`, studyData)
      .then((response) => {
        setStudyData(response.data);
      });
    setOpen(false);
    setStudyData({
      ...studyData,
      name: "",
      info: "",
      numberOfSettings: 1,
    });
    window.location.reload();
  };
  const onNumberOfSettingsChange = (event: any) => {
    console.log(event.target.value);
  };
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box>
            <InputLabel id="demo-simple-select-label">Enter study name</InputLabel>
              <TextField
                required
                fullWidth
                id="outlined-basic"
                variant="outlined"
                color="primary"
                size="small"
                value={studyData.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.value) {
                    setEnableCreateStudyButton(true);
                  } else {
                    setEnableCreateStudyButton(false);
                  }
                  setStudyData({ ...studyData, name: event.target.value });
                }}
              />
            </Box>
            <Box mt={2}>
            <InputLabel id="demo-simple-select-label">Select number of settings</InputLabel>
            <Select
              value={1}
              onChange={(event: any) => {
                setStudyData({ ...studyData, numberOfSettings: event.target.value });
              }}
              size="small"
              fullWidth
            >
              {numberOfSettingsArray.map((num) => <MenuItem value={num}>{num}</MenuItem>)}
            </Select>
            </Box>
            <Box mt={2}>
            <InputLabel id="demo-simple-select-label">Enter note</InputLabel>
              <TextField
              fullWidth
                id="outlined-multiline-static"
                multiline
                size="small"
                rows={3}
                variant="outlined"
                value={studyData.info}
                onChange={(event) => {
                  setStudyData({ ...studyData, info: event.target.value });
                }}
              />
            </Box>
            <Box textAlign="center" mt={2}>
              <Button
                variant="contained"
                sx={{ padding: "4px 40px" }}
                onClick={onCreateStudy}
                disabled={!enableCreateStudyButton}
              >
                Create Study
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
      <Grid container mt={3}>
        <Grid item xs={10}>
          <Typography> Table of studies </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            sx={{ padding: "4px 15px" }}
            onClick={handleOpenCreateStudy}
          >
            Create Study
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateStudy;
