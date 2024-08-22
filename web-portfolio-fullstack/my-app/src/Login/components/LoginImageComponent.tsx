import React from 'react';
import { Button } from '@mui/material';

interface LoginHomePageImageProps {
  newWindow: (component: JSX.Element) => void;
  LoginHomePage: React.FC;
}

const LoginHomePageImageComponent: React.FC<LoginHomePageImageProps> = ({ newWindow, LoginHomePage }) => {

  const handleClickLoginScreen = async () => {
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

export default LoginHomePageImageComponent;