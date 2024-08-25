
import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextfieldComponent from '../Components/TextfieldComponent';
import TextfieldComponentDescription from '../Components/TextfieldComponentDescription';
import { newDashboardWindow } from '../DashboardPage';
import ShowHotelEmployeesFromBossJobs from './ShowHotelEmployeesFromBossJobs';

async function getAllData(){
  try {
    const response = await fetch("http://localhost:3000/hotels/OwnerGetAllEmployeeData", {
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
      _setData(data["AllData"])
    }
    return response;
  } catch (error: any) {
  }
}

var _setData: React.Dispatch<React.SetStateAction<any>>

function ShowAllEmployees() {

  const [Data, setData] = useState<any[]>([]);
  _setData = setData;

  const fetchData = async () => {
    await getAllData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Grid container className='containerInfo' spacing={6}>
      {Data.map((info) => (
        <Grid item xs={6} key={info.infoId} className='containerInfoItems'>
          <TextfieldComponent value={info.employeeId || ''} helpertext={"Employee Id"}/>
          <TextfieldComponent value={info.employeeUsername || ''} helpertext={"Employee Username"}/>
          <TextfieldComponent value={info.employeeEmail || ''} helpertext={"Email"}/>
          <TextfieldComponentDescription value={info.employeeDescription || ''} size={4}/>
          <Grid container spacing={6}>
            <Grid item xs={2}>
            <Button
              variant="contained"
              style={{ marginTop: 10 }}
              onClick={() => newDashboardWindow( <ShowHotelEmployeesFromBossJobs employeeId={info.employeeId}/>)}
            >Check</Button>
            </Grid>
          </Grid>
      </Grid>
      ))}
      </Grid>
    </>
  );
}

export default ShowAllEmployees;