import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { getAllMethodNamesAndRoles } from "./RolesManagementPage";


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
      await getAllMethodNamesAndRoles();
    }
    return response;
  } catch (error: any) {
    console.error(error);
  }
}

// Declare global variables for set state functions (need better approach in real app)
var _setRoleNameMessage: React.Dispatch<React.SetStateAction<string>>;
var _setRoleNameError: React.Dispatch<React.SetStateAction<boolean>>;
var _setData: React.Dispatch<React.SetStateAction<any[]>>;

interface Role {
  id: string;
  roleName: string;
  pageNames: string[];
  methodNames: string[];
}


interface ResponsiveAppBarProps {
  AllMethodNames: string[];
  roles: Role[];
}

function RolesManagement({ AllMethodNames, roles }: ResponsiveAppBarProps) {
  // State to store the selected role object
  const [selectedRole, setSelectedRole] = useState<Role | null>(null); // Initialize with null to represent no selection
  const [inputRole, setInputRole] = useState<string>(''); // Input state for role autocomplete
  const [selectedMethodName, setSelectedMethodName] = useState<string>(''); // State for selected method name

  // Handler for role selection
  const handleRoleChange = (event: any, newRoleName: string | null) => {
    if (newRoleName) {
      const role = roles.find((role) => role.roleName === newRoleName); // Find the role object based on the role name
      setSelectedRole(role || null); // Set the selected role object or null if not found
    } else {
      setSelectedRole(null); // Reset to null if no role is selected
    }
    setSelectedMethodName(''); // Reset selected method name when a new role is selected
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
          <Button onClick={handleConfirm} variant="contained">Submit Method Name</Button>
        </Grid>
        <Grid item xs={2.87} style={{ marginTop: 20 }}>
          <Button onClick={handleDelete} variant="contained">Delete Role</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default RolesManagement;