
import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextfieldComponent from '../Components/TextfieldComponent';
import TextfieldComponentDescription from '../Components/TextfieldComponentDescription';

async function getAllData(employeeId: string){
  try {
    const response = await fetch("http://localhost:3000/hotels/OwnerGetAllEmployeeJobINfoRelatedToOwner", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
      body: JSON.stringify({employeeId: employeeId}),
    });
    if (!response.ok) {
    }
    else {
      const data = await response.json();
      _setData(data["AllData"])
      console.log(data["AllData"])
    }
    return response;
  } catch (error: any) {
  }
}

async function removeJob(jobId: string, employeeId: string){
  try {
    const response = await fetch("http://localhost:3000/hotels/OwnerRemoveJobFromEmployee", {
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
      body: JSON.stringify({jobId: jobId}),
    });
    if (!response.ok) {
    }
    else {
      await getAllData(employeeId)
    }
    return response;
  } catch (error: any) {
  }
}

var _setData: React.Dispatch<React.SetStateAction<any>>
interface ResponsiveAppBarProps {
  employeeId: string;
}

/**
 * in here, you see all the jobs this employee has in relation to owner
 * @returns 
 */

function ShowHotelEmployeesFromBossJobs({ employeeId }: ResponsiveAppBarProps) {

  const [Data, setData] = useState<any[]>([]);
  _setData = setData;

  const fetchData = async () => {
    await getAllData(employeeId);
  }

  useEffect(() => {
    fetchData();
  }, [employeeId]);

  const handleonEditJob = async (jobId: string) => {
  };

  const handleonRemoveJob = async (jobId: string) => {
    await removeJob(jobId, employeeId);
  };
  return (
    <>
      <Grid container className='containerInfo' spacing={6}>
      {Data.map((info) => (
        <Grid item xs={6} key={info.infoId} className='containerInfoItems'>
          <TextfieldComponent value={info.jobName || ''} helpertext={"Job name"}/>
          <TextfieldComponent value={info.jobTitle || ''} helpertext={"Job Title"}/>
          <TextfieldComponent value={info.jobPay || ''} helpertext={"Job Pay"}/>
          <TextfieldComponentDescription value={info.jobDescription|| ''} size={4}/>
          <Grid container spacing={6}>
            <Grid item xs={2}>
              <Button
                variant="contained"
                style={{ marginTop: 10 }}
                onClick={() => handleonEditJob(info.jobId)}
              >Edit</Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                style={{ marginTop: 10 }}
                onClick={() => handleonRemoveJob(info.jobId)}
              >Remove</Button>
            </Grid>
          </Grid>
      </Grid>
      ))}
      </Grid>

      edit dialogue
    </>
  );
}

export default ShowHotelEmployeesFromBossJobs;