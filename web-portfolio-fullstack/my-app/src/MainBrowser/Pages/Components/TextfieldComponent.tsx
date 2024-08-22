
import { TextField } from '@mui/material';
import React from 'react';

interface ResponsiveAppBarProps {
  value: string;
}

function TextfieldComponent({ value }: ResponsiveAppBarProps) {
  return (
    <TextField
      value={value}
      className="gridTextfieldInput"
      fullWidth
      style={{ marginTop: 10 }}
    />
  );
}

export default TextfieldComponent;