import React, { useEffect } from 'react';
import { newWindow } from '../../App';
import LoginHomePage from '../../Login/LoginHomePage';


function LogoutImageComponentSetup() {

  useEffect(() => {
    localStorage.removeItem('jwtToken');
    newWindow(<LoginHomePage />);
  }, []);

  return (
   <>
   </>
  );
};

export default LogoutImageComponentSetup;