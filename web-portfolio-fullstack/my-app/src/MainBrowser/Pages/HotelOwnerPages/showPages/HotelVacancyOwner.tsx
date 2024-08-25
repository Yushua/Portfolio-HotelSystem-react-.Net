
import { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import TextfieldComponent from '../../Components/TextfieldComponent';
import EditVacancyData from '../../EditData/EditVacancyData';
import { newHotelDataWindow } from '../ShowHotelDataOwnerTabs';
import TextfieldComponentDescription from '../../Components/TextfieldComponentDescription';
import HotelVacancies from './HotelVacancies';

async function getVacancyDataHttp(vacancyid:string){
  try {
    const response = await fetch("http://localhost:3000/hotels/GetVacanciesData", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
      body: JSON.stringify({vacancyId: vacancyid}),
    });
    if (!response.ok) {
    }
    else {
      const data = await response.json();
      _setVacancyDataStored(data["VacancyData"])
      console.log(data)
    }
    return response;
  } catch (error: any) {
  }
}


async function getVacancyEmployeeDataHttp(vacancyid:string){
  try {
    const response = await fetch("http://localhost:3000/hotels/GetVacancyEmployeeData", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
      body: JSON.stringify({vacancyId: vacancyid}),
    });
    if (!response.ok) {
    }
    else {
      const data = await response.json();
      console.log(data["vacancyEmplyeeData"])
      _setEmployeeDataStored(data["vacancyEmplyeeData"])
    }
    return response;
  } catch (error: any) {
  }
}

async function DeleteEmployeeFromVacancy(userId: string,  vacancyId: string){
  const credentials = {
    vacancyId: vacancyId,
    userId: userId
  };
  
  try {
    const response = await fetch("http://localhost:3000/hotels/DeleteEmployeeFromVacancy", {
      method: "DELETE",
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
      const data = await response.json();
      _setEmployeeDataStored(data["vacancyEmplyeeData"])
    }
    return response;
  } catch (error: any) {
  }
}

async function AcceptEmployeeForVacancy(userId: string,  vacancyId: string, hotelId: string){
  const credentials = {
    vacancyId: vacancyId,
    userId: userId,
    hotelId: hotelId,
  };
  
  try {
    const response = await fetch("http://localhost:3000/hotels/AcceptEmployeeForVacancy", {
      method: "DELETE",
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
      newHotelDataWindow(<HotelVacancies hotelId={hotelId}/>)
    }
    return response;
  } catch (error: any) {
  }
}


interface ResponsiveAppBarProps {
  vacancyData?: any;
  vacancyid?: string;
  hotelId: string;
  locationReturn: JSX.Element;
}

var _setVacancyDataStored: React.Dispatch<React.SetStateAction<any[]>>
var _setEmployeeDataStored: React.Dispatch<React.SetStateAction<any[]>>

function HotelVacancyOwner({ vacancyData, vacancyid, hotelId, locationReturn }: ResponsiveAppBarProps) {
  const [vacancyDataStored, setVacancyDataStored] = useState<any>([]);
  _setVacancyDataStored = setVacancyDataStored;

  const [EmployeeDataStored, setEmployeeDataStored] = useState<any[]>([]);
  _setEmployeeDataStored = setEmployeeDataStored;

    useEffect(() => {
    if (vacancyid !== undefined){
      getVacancyDataHttp(vacancyid);
    } else {
      setVacancyDataStored(vacancyData);
      getVacancyEmployeeDataHttp(vacancyData.VacancyId)
    }
  }, [vacancyData, vacancyid]);

  const handleAccept = async (userId: string,  vacancyid: string) => {
    AcceptEmployeeForVacancy(userId, vacancyid, hotelId)
  }

  const handleDecline = async (userId: string,  vacancyId: string) => {
    await DeleteEmployeeFromVacancy(userId,  vacancyId)
    await getVacancyEmployeeDataHttp(vacancyId)
  }
  return (
    <>
    <Grid container
      className='containerTabsData'
      spacing={3}
      >
        <Grid item xs={4}>
          <TextfieldComponent value={vacancyDataStored.jobName} helpertext={"Job Name"}/>
        </Grid>
        <Grid item xs={4}>
          <TextfieldComponent value={vacancyDataStored.jobTitle} helpertext={"Job Title"}/>
        </Grid>
        <Grid item xs={4}>
          <TextfieldComponent value={vacancyDataStored.jobPay} helpertext={"Job Payment"}/>
        </Grid>
        <Grid item xs={12}>
          <TextfieldComponentDescription value={vacancyDataStored.jobDescription} size={4}/>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => newHotelDataWindow(<EditVacancyData
              vacancyData={vacancyDataStored}
              hotelId={hotelId}
              locationReturn={locationReturn}
              />)}
          >edit</Button>
        </Grid>
      {EmployeeDataStored.length > 0 ? (
        EmployeeDataStored.map((employee) => (
        <Grid item xs={4} key={employee.employeeId}>
          <Grid container direction="column" spacing={1} className='containerTabsDataEmployee'>
            <Grid item xs={6}>
              <TextfieldComponent value={employee.employeeUsername} helpertext={"Employee"}/>
            </Grid>
            <Grid item xs={6}>
              <TextfieldComponent value={employee.employeeEmail} helpertext={"Email"}/>
            </Grid>
            <Grid item xs={12}>
              <TextfieldComponentDescription value={employee.employeeDescription} size={4}/>
            </Grid>
            <Grid item xs={12}
              justifyContent="center" 
              alignItems="center"
              className='employeeDataVacancyButtonBox'
            >
              <Button
                variant="contained"
                className='employeeDataVacancyButton'
                onClick={() => handleAccept(employee.employeeId, vacancyDataStored.VacancyId)}
                >Accept
              </Button>
              <Button
                variant="contained"
                className='employeeDataVacancyButton'
                onClick={() => handleDecline(employee.employeeId, vacancyDataStored.VacancyId)}
                >Decline
              </Button>
            
            </Grid>
          </Grid>

        </Grid>
          
        ))
      ) : (
        <></>
      )}
      </Grid>
    </>
  );
}

export default HotelVacancyOwner;