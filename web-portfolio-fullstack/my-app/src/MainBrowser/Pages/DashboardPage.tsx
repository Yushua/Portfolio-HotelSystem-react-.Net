import { Box, Grid } from '@mui/material';
import './Dashboard.css';
import React from 'react';
function DashboardPage() {
  return (
    <>
    {/* ok
    first box, is the dashboard box. this one taken the entire width and height
    from the previous box.
    then within, there is one container. in that container, there are items. each representing
    a block.
    the top block
    the second row block two seperate, these are longer
    
    the top block has the user
    the second block the pages it can access
    the third block user data. achievements, etc. for now,
    the first two are enough*/}

  <Box className='MainBrowserBox'>
    <div className="MuiGrid-container position-top-left">
      <Grid container className="gridContainer">
        <Grid item xs={12}>
          <Box className="gridItem">
          </Box>
        </Grid>
      </Grid>
    </div>
  </Box>
    </>
  );
}

export default DashboardPage;