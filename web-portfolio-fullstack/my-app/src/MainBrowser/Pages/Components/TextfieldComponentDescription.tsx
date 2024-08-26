
import { TextField } from '@mui/material';
import React from 'react';

interface ResponsiveAppBarProps {
  value: string;
  size: number;

}

function TextfieldComponentDescription({ value, size }: ResponsiveAppBarProps) {
  return (
    <TextField
      value={value}
      className="gridTextfieldInput"
      fullWidth
      multiline
      label={"Description"}
      style={{ marginTop: 10 }}
      rows={size}
      variant="outlined"
    />
  );
}

export default TextfieldComponentDescription;