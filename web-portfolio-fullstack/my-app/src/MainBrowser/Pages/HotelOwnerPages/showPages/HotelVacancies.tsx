
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import TextfieldComponent from '../../Components/TextfieldComponent';
import TextfieldComponentDescription from '../../Components/TextfieldComponentDescription';
import HotelVacancyOwner from './HotelVacancyOwner';
import { newHotelDataWindow } from '../ShowHotelDataOwnerTabs';

interface ResponsiveAppBarProps {
  hotelId: string;
}

async function getVacanciesData(hotelId: string){
  try {
    const response = await fetch("http://localhost:3000/hotels/GetVacanciesData", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
      body: JSON.stringify({HotelId: hotelId}),
    });
    if (!response.ok) {
      //handleError
    }
    else {
      const data = await response.json();
      console.log("i am here")
      console.log(data["vacanciesData"])
      _setVacanciesDataStored(data["vacanciesData"])
    }
    return response;
  } catch (error: any) {
    console.log(error)
  }  
}

var _setVacanciesDataStored: React.Dispatch<React.SetStateAction<any[]>>

function HotelVacancies({ hotelId }: ResponsiveAppBarProps) {

  const [vacanciesDataStored, setVacanciesDataStored] = useState<any[]>([]);
  _setVacanciesDataStored = setVacanciesDataStored;

  useEffect(() => {
    getVacanciesData(hotelId);
  }, [hotelId]);

  return (
    <>
      {vacanciesDataStored.map((vacancy) => (
        <Grid container
        className='containerTabs'
        spacing={3}
        onClick={() => newHotelDataWindow(
        <HotelVacancyOwner
        hotelId={hotelId}
        vacancyData={vacancy}
        locationReturn={<HotelVacancies hotelId={hotelId}/>}
        key={hotelId}
        />)}
        >
          <Grid item xs={3}>
            <TextfieldComponent value={vacancy.jobName} helpertext={"Job Name"}/>
          </Grid>
          <Grid item xs={3}>
            <TextfieldComponent value={vacancy.jobTitle} helpertext={"Job Title"}/>
          </Grid>
          <Grid item xs={3}>
            <TextfieldComponent value={vacancy.jobPay} helpertext={"Job Payment"}/>
          </Grid>
          <Grid item xs={3}>
            <TextfieldComponent value={vacancy.jobPay} helpertext={"Job Applicants"}/>
          </Grid>
          <Grid item xs={12}>
            <TextfieldComponentDescription value={vacancy.jobDescription} size={4}/>
          </Grid>
        </Grid>
    ))}
    </>
  );
}

export default HotelVacancies;