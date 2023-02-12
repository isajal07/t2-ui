import React from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Grid,
  Modal,
  TextField,
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
  const [studyData, setStudyData] = React.useState({
    name: "",
    info: "",
    createdBy: admin,
    createdAt: Date(),
  });
  const [enableCreateStudyButton, setEnableCreateStudyButton] =
    React.useState(false);
  const handleClose = () => setOpen(false);
  const onCreateStudy = async () => {
    await axios
      .post("http://localhost:5001/api/createStudy", studyData)
      .then((response) => {
        setStudyData(response.data);
      });
    setOpen(false);
    setStudyData({
      ...studyData,
      name: "",
      info: "",
    });
    window.location.reload();
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
              <TextField
                required
                fullWidth
                id="outlined-basic"
                label="Enter study name"
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
              <TextField
              fullWidth
                id="outlined-multiline-static"
                multiline
                size="small"
                rows={3}
                variant="outlined"
                label="Enter note..."
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
