import React from 'react';
import { Button } from '@mui/material';
import { newWindow } from '../../App';
import LoginHomePage from '../../Login/LoginHomePage';


function LogoutImageComponentSetup() {

  const handleClickLoginScreen = async () => {
    localStorage.removeItem('jwtToken');
    await newWindow(<LoginHomePage />);
  };

  return (
    <div className='centerBox'>
      <Button onClick={handleClickLoginScreen} className="imageButton">
        <img src="/path/to/your/image.jpg" alt="HomePage Button" className="buttonImage" />
      </Button>
    </div>
  );
};

export default LogoutImageComponentSetup;