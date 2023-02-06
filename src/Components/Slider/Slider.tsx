import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

export interface SliderProps {
    silderName: string;
    min: number;
    max: number;
    step: number;
    textFontSize: number;
    onChange: any;
    value: number;
}
export default function NonLinearlider(props:SliderProps) {
  const { silderName, min, max, step, textFontSize, onChange, value } = props;

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="non-linear-slider" gutterBottom fontSize={textFontSize}>
        {silderName}: {value}
      </Typography>
      <Slider
        value={value}
        min={min}
        step={step}
        max={max}
        onChange={onChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
    </Box>
  );
}