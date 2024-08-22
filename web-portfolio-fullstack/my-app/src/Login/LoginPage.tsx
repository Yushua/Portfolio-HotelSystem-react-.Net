import React, { useState } from 'react';
import './Login.css';
import Button from '@mui/material/Button';
import { newWindow } from '../App';
import LoginHomePageImageComponent from './components/LoginImageComponent';
import LoginHomePage from './LoginHomePage';
import { TextField } from '@mui/material';
import RoleSetup from './RoleSetup';


async function sendLoginData(username: string, password: string){
  const credentials = {
    username: username,
    password: password,
  };
  try {
    const response = await fetch("http://localhost:3000/auth/loginUser", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      if (response.status === 404){
        _setLoginNameError(true)
        _setLoginNameMessage("invalid login credentials")
        _setLoginPasswordError(true)
        _setLoginPasswordMessage("invalid password credentials")
      }
    }
    else {
      const data = await response.json();
      localStorage.setItem('jwtToken', data["authToken"]);
      newWindow(<RoleSetup/>)
    }
    return response;
  } catch (error: any) {
  }
}

async function sendCreateAccount(username: string, password: string){
  const credentials = {
    username: username,
    password: password,
  };
  try {
    const response = await fetch("http://localhost:3000/auth/createUser", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      if (response.status === 409){
        _setLoginNameError(true)
        _setLoginNameMessage("Credentials already in use")
        _setLoginPassword("")
      }
    } else {
      const data = await response.json();
      localStorage.setItem('jwtToken', data["authToken"]);
      newWindow(<RoleSetup/>)
    }
    return response;
  } catch (error: any) {
  }
}

var _setLoginNameMessage: React.Dispatch<React.SetStateAction<string>>
var _setLoginNameError: React.Dispatch<React.SetStateAction<boolean>>

var _setLoginPassword: React.Dispatch<React.SetStateAction<string>>
var _setLoginPasswordMessage: React.Dispatch<React.SetStateAction<string>>
var _setLoginPasswordError: React.Dispatch<React.SetStateAction<boolean>>

interface LoginCreateProps {
  ActionName: string;
}

const LoginCreatePage: React.FC<LoginCreateProps> = ({ ActionName }) => {
  const [LoginName, setLoginName] = useState<string>('');
  const [LoginNameMessage, setLoginNameMessage] = useState<string>('');
  _setLoginNameMessage = setLoginNameMessage
  const [LoginNameError, setLoginNameError] = useState<boolean>(false);
  _setLoginNameError = setLoginNameError


  const [LoginPassword, setLoginPassword] = useState<string>('');
  _setLoginPassword = setLoginPassword
  const [LoginPasswordMessage, setLoginPasswordMessage] = useState<string>('');
  _setLoginPasswordMessage = setLoginPasswordMessage
  const [LoginPasswordError, setLoginPasswordError] = useState<boolean>(false);
  _setLoginPasswordError = setLoginPasswordError


  const handleLoginNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLoginName(value);
  };

  const handleLoginPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLoginPassword(value);
  };

  const handleClickLogin = async () => {
    var failure: Boolean = false;
    if (LoginName.length < 5) {
      setLoginNameError(true);
      setLoginNameMessage("username needs to be longer than 5");
      failure = true;
    }  else if (LoginName.length > 20) {
      setLoginNameError(true);
      setLoginNameMessage("username needs to be shorter than 20");
      failure = true;
    } else {
      setLoginNameError(false)
    }
    if (LoginPassword.length < 5) {
      setLoginPasswordError(true);
      setLoginPasswordMessage("Password needs to be longer than 5 characters");
      failure = true;
    }  else if (LoginPassword.length > 20) {
      setLoginPasswordError(true);
      setLoginPasswordMessage("Password needs to be shorter than 20 characters");
      failure = true;
    } else {
      setLoginPasswordError(false);
    }
    if (!failure){
      if (ActionName === "Login Account")
        sendLoginData(LoginName, LoginPassword);
      else if (ActionName === "Create Account")
        sendCreateAccount(LoginName, LoginPassword);
    }
  };
  


    return (
      <div>
        <div className="LoginPageImageBox">
          <LoginHomePageImageComponent newWindow={newWindow} LoginHomePage={LoginHomePage} />
        </div>
        <div className="LoginPageBox">
          <div className='textFieldBox'>
            {ActionName}
          </div>
          <div className='textFieldBox'>
            <TextField
              required
              label="Username"
              helperText={LoginNameMessage}
              error={LoginNameError}
              onChange={handleLoginNameChange}
            />
          </div>
          <div className='textFieldBox'>
            <TextField
              required
              label="Password"
              type="password"
              autoComplete="current-password"
              value={LoginPassword}
              error={LoginPasswordError}
              helperText={LoginPasswordMessage}
              onChange={handleLoginPasswordChange}
            />
          </div>
          <div className="buttonWrapper">
            <Button onClick={handleClickLogin} variant="contained">Confirm</Button>
          </div>
        </div>
      </div>
    );
  }
  
  export default LoginCreatePage;