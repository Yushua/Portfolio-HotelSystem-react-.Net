import { Box, Grid } from '@mui/material';
import './Dashboard.css';
import React from 'react';
function DashboardPageInfo() {
  return (
    <>
      <div className="MuiGrid-container position-top-left">
        <Grid container className="gridContainer">
          <Grid item xs={12}>
            <Box className="gridItem">
              dashboard
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default DashboardPageInfo;