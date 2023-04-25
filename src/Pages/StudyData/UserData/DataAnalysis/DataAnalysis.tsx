import React from "react";
import { Container, Box, Button, Typography, Grid, Modal } from "@mui/material";

export interface Props {
    userGameData: any;
}
const DataAnalysis = (props: Props) => {
    const { userGameData } = props;
  return <Box>Data analysis here...</Box>;
};

export default DataAnalysis;
