
import React, { useEffect, useState } from 'react';
import CreateRole from './CreateRole';
import RolesManagement from './RoleManagement';

export async function getAllMethodNamesAndRoles(){
  try {
    const response = await fetch("http://localhost:3000/auth/getAllBackendMethodNamesAndRoles", {
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
      const MethodNames = await response.json();
      _setMethodNames(MethodNames["methodNames"])
      _setRoles(MethodNames["roles"])
      console.log(MethodNames["methodNames"])
      console.log(MethodNames["roles"])
    }
    return response;
  } catch (error: any) {
  }
}

var _setMethodNames: React.Dispatch<React.SetStateAction<any[]>>
var _setRoles: React.Dispatch<React.SetStateAction<any[]>>

function RolesManagementPage() {
  const [MethodNames, setMethodNames] = useState<string[]>([]);
  _setMethodNames = setMethodNames;
  const [Roles, setRoles] = useState<any[]>([]);
  _setRoles = setRoles;

  /*
  use webpages to see every available webpage for the dashboard. every other page
  is more a sub page.

  in this page, if you are the admit (checked when getting in) you get to decide what pages
  a person gets, or not. the backend checks if you have the proper role to do this.

  if correct

  setup is simple. you have one line of the pages you want to add, then another of all the roles you want
  to give it to.

  then the backend will add this to said role IF you have the proper role to do this.
  */

  const fetchMethodNames = async () => {
    await getAllMethodNamesAndRoles();
  }

  useEffect(() => {
    fetchMethodNames();
  }, []);
  
  return (
    <>
      <CreateRole/>
      {MethodNames != null && Roles != null ? <RolesManagement AllMethodNames={MethodNames} roles={Roles} /> : null}
    </>
  );
}

export default RolesManagementPage;