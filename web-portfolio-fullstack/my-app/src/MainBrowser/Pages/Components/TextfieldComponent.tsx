
import { TextField } from '@mui/material';
import React from 'react';


interface ResponsiveAppBarProps {
  value: string;
  helpertext: string;
  // setting: string;
}

function TextfieldComponent({ value, helpertext }: ResponsiveAppBarProps) {
  return (
    <TextField
      value={value}
      className="gridTextfieldInput"
      fullWidth
      // {required}
      label={helpertext}
      style={{ marginTop: 10 }}
      variant="filled"
    />
  );
}

export default TextfieldComponent;