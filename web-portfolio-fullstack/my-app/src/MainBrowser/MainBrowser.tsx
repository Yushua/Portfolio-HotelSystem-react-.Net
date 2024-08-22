import React, { useState } from 'react';
import './MainBrowser.css';
import DashboardPage from './Pages/DashboardPage';
import AppBar from './AppBarPage';
import { Box } from '@mui/material';

export async function newBrowserWindow(newWindow:JSX.Element) {
  if (!!_setWindowBrowser && !document.getElementById("ErrorPage"))
    _setWindowBrowser(newWindow)
}

var _setWindowBrowser: React.Dispatch<React.SetStateAction<JSX.Element>> | null = null

type WebPagesProp = Array<[string, JSX.Element]>;
interface ResponsiveAppBarProps {
  webPages: WebPagesProp;
}

function MainBrowser({ webPages }: ResponsiveAppBarProps){
  
  const [WindowBrowser, setWindowBrowser] = useState<JSX.Element>(<DashboardPage/>)
  _setWindowBrowser = setWindowBrowser

  // React.useEffect(() => {
  //   console.log(webPages)
  // }, [webPages]);

    return (
      <>
      <div>
        <div>
          <AppBar webPages={webPages}/>
        </div>
          {WindowBrowser}
      </div>
      </>
    );
  }
  
  export default MainBrowser;