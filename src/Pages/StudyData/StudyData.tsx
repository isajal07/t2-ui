import React from "react";
import axios from "axios";

import { Container, Box, Button, Typography, Grid, Modal } from "@mui/material";

import "./StudyData.css";
import ResponsiveAppBar from "../../Components/AppBar/AppBar";
import CreateStudy from "./CreateStudy/CreateStudy";
import Studies from "./Studies/Studies";
const StudyData = () => {
const [studies, setStudies] = React.useState([]);
React.useEffect(() => {
  axios.get("http://localhost:5001/api/getStudies").then((response) => {
    setStudies(response.data);
      });
},[]);
  return (
    <div className="Data">
      <ResponsiveAppBar />
      <Container>
        <CreateStudy/>
        {studies ? <Studies studies={studies}/> : <>Loading...</>}
      </Container>
    </div>
  );
}

export default StudyData;
