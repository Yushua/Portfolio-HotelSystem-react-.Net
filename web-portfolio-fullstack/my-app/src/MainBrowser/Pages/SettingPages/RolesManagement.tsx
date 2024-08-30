
import React from 'react';
import { WebPages } from '../../../Login/RoleSetup';

function RolesManagement() {
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
  return (
    <>
      Add or Remove Roles from your account
      removing it wont make it that your data is gone, it is still there. you
      just can't access it. roles are done at the end.
    </>
  );
}

export default RolesManagement;