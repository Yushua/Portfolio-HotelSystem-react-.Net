import React from 'react';
import { Button } from '@mui/material';

interface LogoutImageProps {
  newWindow: (component: JSX.Element) => void;
  LoginHomePage: React.FC;
}

const LogoutImageComponent: React.FC<LogoutImageProps> = ({ newWindow, LoginHomePage }) => {

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

export default LogoutImageComponent;