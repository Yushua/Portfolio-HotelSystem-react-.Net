
import React, { useEffect, useState } from 'react';
import { WebPages } from '../../../Login/RoleSetup';
import { Button, Grid, TextField } from '@mui/material';

async function AddNewRole(roleName: string){
  try {
    const response = await fetch("http://localhost:3000/auth/getAllBackendMethodNames", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
    });
    if (!response.ok) {
    }
    else {
      const data = await response.json();
      _setData(data["methodNames"])
      console.log(data["methodNames"])
    }
    return response;
  } catch (error: any) {
  }
}

var _setRoleNameMessage: React.Dispatch<React.SetStateAction<string>>
var _setRoleNameError: React.Dispatch<React.SetStateAction<boolean>>

var _setData: React.Dispatch<React.SetStateAction<any[]>>

function RolesManagement() {
  const [RoleName, setRoleName] = useState<string>('');
  const [RoleNameMessage, setRoleNameMessage] = useState<string>('');
  _setRoleNameMessage = setRoleNameMessage
  const [RoleNameError, setRoleNameError] = useState<boolean>(false);
  _setRoleNameError = setRoleNameError

  const handleRoleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRoleName(value);
  };
  
  const handleConfirm = async () => {
    await AddNewRole(RoleName);
  }

  return (
    <>
    <Grid container className='containerRoleSetup' spacing={6}>
      Role management here you add or remove Pathnames for each
    </Grid>
    </>
  );
}

export default RolesManagement;