import React, { useState } from 'react';
import './App.css';
import RefreshPageCheck from './Login/RefreshCheckPage';

export async function newWindow(newWindow:JSX.Element) {
  if (!!_setWindow && !document.getElementById("ErrorPage"))
    _setWindow(newWindow)
}

var _setWindow: React.Dispatch<React.SetStateAction<JSX.Element>> | null = null

function App() {

  const [window, setWindow] = useState<JSX.Element>(<RefreshPageCheck/>)
  _setWindow = setWindow

  return (
    window
  );
}

export default App;
