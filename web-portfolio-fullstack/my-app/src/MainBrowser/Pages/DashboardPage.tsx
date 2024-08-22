import { Box } from '@mui/material';
import './Dashboard.css';
import React, { useState } from 'react';
import DashboardPageInfo from './DashboardInfo';

export async function newDashboardWindow(newWindow:JSX.Element) {
  if (!!_setWindowDashboard && !document.getElementById("ErrorPage"))
    _setWindowDashboard(newWindow)
}

var _setWindowDashboard: React.Dispatch<React.SetStateAction<JSX.Element>> | null = null

function DashboardPage() {

  const [WindowDashboard, setWindowDashboard] = useState<JSX.Element>(<DashboardPageInfo/>)
  _setWindowDashboard = setWindowDashboard

  return (
    <>
      <Box className='MainBrowserBox'>
        {WindowDashboard}
      </Box>
    </>
  );
}

export default DashboardPage;