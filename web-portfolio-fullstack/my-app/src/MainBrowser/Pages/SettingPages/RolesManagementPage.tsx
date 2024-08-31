
import React, { useEffect, useState } from 'react';
import CreateRole from './CreateRole';
import RolesManagement from './RoleManagement';

async function getAllRoutes(){
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

var _setData: React.Dispatch<React.SetStateAction<any[]>>

function RolesManagementPage() {
  const [Data, setData] = useState<any[]>([]);
  _setData = setData;

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

  const fetchData = async () => {
    await getAllRoutes();
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <>
      <CreateRole/>

      <RolesManagement/>
    </>
  );
}

export default RolesManagementPage;