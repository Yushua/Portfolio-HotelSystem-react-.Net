import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import RolesManagementPage, { getAllMethodNamesAndRoles } from "./RolesManagementPage";
import RoleCheckBoxPatchData from "./RoleCheckBoxPatchData";
import { newDashboardWindow } from "../DashboardPage";


export async function refreshRolePage(){
  await getAllMethodNamesAndRoles();
  _setSelectedRole(null);
  await newDashboardWindow(<RolesManagementPage/>);
}
// Async function to add a new role (keeping your original function for context)
async function DeleteRole(roleId: string) {
  try {
    const response = await fetch("http://localhost:3000/auth/DeleteRole/" + roleId, {
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
    });
    if (!response.ok) {
      // Handle error here
    } else {
      refreshRolePage();
    }
    return response;
  } catch (error: any) {
    console.error(error);
  }
}

// Declare global variables for set state functions (need better approach in real app)
var _setSelectedRole: React.Dispatch<React.SetStateAction<Role | null>>;

interface Role {
  id: string;
  roleName: string;
  pageNames: string[];
  methodNames: string[];
}

interface ResponsiveAppBarProps {
  AllMethodNames: any[];
  roles: Role[];
}

function RolesManagement({ AllMethodNames, roles }: ResponsiveAppBarProps) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [inputRole, setInputRole] = useState<string>('');
  _setSelectedRole = setSelectedRole;

  const handleRoleChange = (event: any, newRoleName: string | null) => {
    if (newRoleName) {
      const role = roles.find((role) => role.roleName === newRoleName);
      setSelectedRole(role || null);
      console.log(role);
    } else {
      setSelectedRole(null);
    }
  };

  // Handler for the confirm button
  const handleConfirm = async () => {
    if (selectedRole) {
      console.log("Selected Role:", selectedRole);
      // Perform actions with selectedRole
    } else {
      console.log("No role selected");
    }
  };

  // Handler for the delete button
  const handleDelete = async () => {
    if (selectedRole) {
      await DeleteRole(selectedRole.id)
    } else {
      console.log("No role selected for deletion");
    }
  };

  return (
    <>
      <Grid container className="containerRoleSetup" spacing={6}>
        <Grid item xs={4}>
          {/* Dropdown for Roles */}
          <Autocomplete
            value={selectedRole?.roleName || ''} // Use selectedRole's roleName or an empty string if null
            onChange={handleRoleChange}
            inputValue={inputRole}
            onInputChange={(event, newInputValue) => {
              setInputRole(newInputValue);
            }}
            id="roles-dropdown"
            options={roles.map((role) => role.roleName)}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Select Role" />}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2.87} style={{ marginTop: 20 }}>
          <Button onClick={handleDelete} variant="contained">Delete Role</Button>
        </Grid>
      </Grid>
      {selectedRole != null ? <RoleCheckBoxPatchData AllMethodNames={AllMethodNames} roles={selectedRole} /> : null}
    </>
  );
}

export default RolesManagement;