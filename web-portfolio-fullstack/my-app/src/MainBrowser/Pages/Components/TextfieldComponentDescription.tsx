
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
      style={{ marginTop: 10 }}
      rows={size}
    />
  );
}

export default TextfieldComponentDescription;