
import React, { useEffect, useState } from 'react';
import { WebPages } from '../../../Login/RoleSetup';
import { Button, Grid, TextField } from '@mui/material';
import { newBrowserWindow } from '../../MainBrowser';
import RolesManagementPage, { getAllMethodNamesAndRoles } from './RolesManagementPage';
import { refreshRolePage } from './RoleManagement';

async function AddNewRole(roleName: string){
  const credentials = {
    roleName: roleName
  };
  await getAllMethodNamesAndRoles();
  try {
    const response = await fetch("http://localhost:3000/auth/CreateNewRole", {
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
    }
    else {
      refreshRolePage();
    }
    return response;
  } catch (error: any) {
  }
}

var _setRoleNameMessage: React.Dispatch<React.SetStateAction<string>>
var _setRoleNameError: React.Dispatch<React.SetStateAction<boolean>>

var _setData: React.Dispatch<React.SetStateAction<any[]>>

function CreateRole() {
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
      <Grid item xs={4}>
        <TextField
          required
          label="Role Name"
          className="gridTextfieldInput"
          fullWidth
          style={{ marginTop: 10 }}
          helperText={RoleNameMessage}
          error={RoleNameError}
          onChange={handleRoleNameChange}
        />
        <Grid item xs={6} style={{ marginTop: 20 }}>
            <Button onClick={handleConfirm} variant="contained">Submit new Role</Button>
        </Grid>
      </Grid>
    </Grid>
    </>
  );
}

export default CreateRole;