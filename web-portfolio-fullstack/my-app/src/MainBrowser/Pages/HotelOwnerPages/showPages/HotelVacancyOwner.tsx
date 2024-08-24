
import { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import TextfieldComponent from '../../Components/TextfieldComponent';
import EditVacancyData from '../../EditData/EditVacancyData';
import { newHotelDataWindow } from '../ShowHotelDataOwnerTabs';

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
      _setEmployeeDataStored(data["vacancyEmplyeeData"])
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

  return (
    <>
    <Grid container
      className='containerTabsData'
      spacing={3}
      >
        <Grid item xs={4}>
          <TextfieldComponent value={vacancyDataStored.jobName}/>
        </Grid>
        <Grid item xs={4}>
          <TextfieldComponent value={vacancyDataStored.jobTitle}/>
        </Grid>
        <Grid item xs={4}>
          <TextfieldComponent value={vacancyDataStored.jobPay}/>
        </Grid>
        <Grid item xs={12}>
          <TextfieldComponent value={vacancyDataStored.jobDescription}/>
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
              <TextfieldComponent value={employee.employeeUsername} />
            </Grid>
            <Grid item xs={6}>
              <TextfieldComponent value={employee.employeeEmail} />
            </Grid>
            <Grid item xs={12}>
              <TextfieldComponent value={employee.employeeDescription} />
            </Grid>
            <Grid item xs={12}
              justifyContent="center" 
              alignItems="center"
              className='employeeDataVacancyButtonBox'
            >
              <Button
                variant="contained"
                className='employeeDataVacancyButton'
                onClick={() => newHotelDataWindow(<EditVacancyData
                  vacancyData={vacancyDataStored}
                  hotelId={hotelId}
                  locationReturn={locationReturn}
                  />)}
                >Accept
              </Button>
              <Button
                variant="contained"
                className='employeeDataVacancyButton'
                onClick={() => newHotelDataWindow(<EditVacancyData
                  vacancyData={vacancyDataStored}
                  hotelId={hotelId}
                  locationReturn={locationReturn}
                  />)}
                >Decline
              </Button>
            
            </Grid>
          </Grid>

        </Grid>
          
        ))
      ) : (
        <p>No employees found</p>
      )}
      </Grid>
    </>
  );
}

export default HotelVacancyOwner;