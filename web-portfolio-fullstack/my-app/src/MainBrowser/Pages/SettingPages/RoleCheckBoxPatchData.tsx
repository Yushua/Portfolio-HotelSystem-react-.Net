import React, { useState, useEffect } from 'react';
import { Button, Grid, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { getAllMethodNamesAndRoles } from './RolesManagementPage';
import { refreshRolePage } from './RoleManagement';

// PatchRole function remains unchanged
async function PatchRole(roleId: string, newMethodNames: string[]) {
  try {
    if (!Array.isArray(newMethodNames) || !newMethodNames.every(item => typeof item === 'string')) {
      throw new Error('newMethodNames must be an array of strings.');
    }
    const credentials = {
      methodNames: newMethodNames,
      roleId: roleId
    };
    const response = await fetch("http://localhost:3000/auth/PatchRole", {
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      await refreshRolePage()
    }
    return response;
  } catch (error: any) {
    console.error(error);
  }
}

interface Role {
  id: string;
  roleName: string;
  pageNames: string[];
  methodNames: string[];
}

interface Method {
  methodName: string;
  controller: string;
}

interface ResponsiveAppBarProps {
  AllMethodNames: Method[];
  roles: Role;
}

function RoleCheckBoxPatchData({ AllMethodNames, roles }: ResponsiveAppBarProps) {
  const [methodNames, setMethodNames] = useState<string[]>(roles.methodNames);

  // Use effect to update methodNames when the roles prop changes
  useEffect(() => {
    setMethodNames(roles.methodNames);
  }, [roles]);

  // Grouping methods by their controller for display purposes
  const methodsByController = AllMethodNames.reduce((acc, method) => {
    if (!acc[method.controller]) {
      acc[method.controller] = [];
    }
    acc[method.controller].push(method.methodName);
    return acc;
  }, {} as Record<string, string[]>);

  // Toggle the checkbox state
  const handleCheckboxChange = (methodName: string) => {
    setMethodNames((prev) =>
      prev.includes(methodName)
        ? prev.filter((name) => name !== methodName)
        : [...prev, methodName]
    );
  };

  // Function to handle the submit button click
  const handleSubmit = () => {
    const updatedRole = {
      ...roles,
      methodNames: methodNames,
    };
    PatchRole(updatedRole.id, methodNames);
  };

  return (
    <>
      <Grid container className='containerRoleSetup' spacing={2}>
        {Object.entries(methodsByController).map(([controller, methods], index) => (
          <React.Fragment key={index}>
            {/* Display controller name */}
            <Grid item xs={12}>
              <Typography variant="body1">
                {controller}
              </Typography>
            </Grid>
            {/* Display checkboxes for each method name */}
            {methods.map((methodName, idx) => (
              <Grid item xs={2.7} key={idx}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={methodNames.includes(methodName)} // Check if methodName is in methodNames state
                      onChange={() => handleCheckboxChange(methodName)}
                    />
                  }
                  label={methodName}
                />
              </Grid>
            ))}
          </React.Fragment>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

export default RoleCheckBoxPatchData;
