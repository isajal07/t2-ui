import React from "react";
import { Container, Box, Button, Typography, Grid, Modal } from "@mui/material";
import Divider from "@mui/material/Divider";
import { std, mean, min, max} from "mathjs";

export interface Props {
  userGameData: any;
}

const DataAnalysis = (props: Props) => {
  const { records } = props.userGameData;
console.log(records)
  const refactorRecords = (records: any) => {
    let abc = [];
    let currentGroup = [];
    for (const item of records) {
      if (item.eventName === "EndOfWave") {
        abc.push(currentGroup);
        currentGroup = [];
      } else {
        currentGroup.push(item);
      }
    }
    if (currentGroup.length > 0) abc.push(currentGroup);

    const result: any = [];

    // Initialize the result array with empty objects
    abc.forEach(() => {
      result.push([
        { Human: 0, latencySet: [], totalLatency: 0 },
        { AI: 0, latencySet: [], totalLatency: 0 },
      ]);
    });

    // Loop through each event in the array
    abc.forEach((eventArray, i) => {
      eventArray.forEach((event) => {
        // If the event is 'PickedAdvisorType' with Human or AI as eventModifiers
        if (
          event.eventName === "PickedAdvisorType" &&
          (event.eventModifiers === "Human" || event.eventModifiers === "AI")
        ) {
          // Increment the appropriate count in the result array
          const index =
            event.eventModifiers === "Human"
              ? 0
              : event.eventModifiers === "AI"
              ? 1
              : -1;
          result[i][index][event.eventModifiers]++;
        } else if (event.eventName === "HumanSelectLatency") {
          // If the event is 'HumanSelectLatency'
          result[i][0].totalLatency += parseFloat(event.eventModifiers);
          result[i][0].latencySet.push(parseFloat(event.eventModifiers));
        } else if (event.eventName === "AISelectLatency") {
          // If the event is 'AISelectLatency'
          result[i][1].totalLatency += parseFloat(event.eventModifiers);
          result[i][1].latencySet.push(parseFloat(event.eventModifiers));
        }
      });
    });

    //Standard devitation. 
    const tt = result.map((res:any)=> res.map((r:any)=> {
        return {
            ...r,
            avgLat: r.latencySet.length != 0 && mean(r.latencySet),
            SD: r.latencySet.length != 0 && std(r.latencySet),
            min: r.latencySet.length != 0 && min(r.latencySet),
            max: r.latencySet.length != 0 && max(r.latencySet),
        }
    }))

    if(tt.length > 6) tt.pop();
    
    return tt;
  };

  const refactoredRecords = records && refactorRecords(records);
  console.log(refactoredRecords);

  return (
    <Box>
      <Box style={{border: "solid 1px"}}>
        <Box m={2}>
            <Typography fontSize={18} fontWeight={5} textAlign={"center"}>Stats</Typography>
            <Divider/>
            <Box mt={2} mb={2}>
                {refactoredRecords?.map((rr:any, index:any) => <>
                <Box textAlign={"center"} fontSize={17} fontWeight={30} mt={2} mb={2}>WAVE {index + 1}</Box>
                <Grid container m={2}>
                <Grid item xs={5}>
                <Box ml={2} textAlign={"center"}>HUMAN</Box>
                <Box ml={4}><b>Count:</b> {rr[0].Human} </Box>
                <Box ml={4}><b>Latencies:</b> <Box style={{wordWrap: "break-word"}}>{rr[0].latencySet.toString()} </Box> </Box>
                <Box ml={4}><b>Total Latency:</b> {rr[0].totalLatency} </Box>
                <Box ml={4}><b>Avg. Latency:</b> {rr[0].avgLat} </Box>
                <Box ml={4}><b>SD:</b> {rr[0].SD} </Box>
                <Box ml={4}><b>Min:</b> {rr[0].min}</Box>
                <Box ml={4}><b> Max:</b> {rr[0].max}</Box>
                </Grid>
                <Grid item xs={5}>
                <Box ml={2} textAlign={"center"}>AI</Box> 
                <Box ml={4}><b>Count:</b> {rr[1].AI}</Box>
                <Box ml={4}><b>Latencies:</b> <Box style={{wordWrap: "break-word"}}>{rr[1].latencySet.toString()}</Box> </Box>
                <Box ml={4}><b>Total Latency:</b> {rr[1].totalLatency} </Box>
                <Box ml={4}><b>Avg. Latency:</b> {rr[1].avgLat} </Box>
                <Box ml={4}><b>SD:</b> {rr[1].SD} </Box>
                <Box ml={4}><b>Min:</b> {rr[1].min}</Box>
                <Box ml={4}><b>Max:</b> {rr[1].max}</Box>
                </Grid>
                </Grid>
                <Divider/>
                </>
                )}
            </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DataAnalysis;
