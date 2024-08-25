
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextfieldComponent from '../../Components/TextfieldComponent';
import TextfieldComponentDescription from '../../Components/TextfieldComponentDescription';

async function getEmployeeData(hotelId: string){

  const credentials = {
    HotelId: hotelId,
  };

  try {
    const response = await fetch("http://localhost:3000/hotels/GetAllHotelEmployeeDataOwner", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      //handleError
    }
    else {
      const data = await response.json();
      _setEmployeeData(data["EmployeeData"])
      console.log(data)
    }
    return response;
  } catch (error: any) {
  }
}

interface ResponsiveAppBarProps {
  hotelId: string;
}

var _setEmployeeData: React.Dispatch<React.SetStateAction<any>>

function ShowHotelEmployees({ hotelId }: ResponsiveAppBarProps) {

  const [EmployeeData, setEmployeeData] = useState<any[]>([]);
  _setEmployeeData = setEmployeeData;

  const fetchOwnerEmployeeData = async () => {
    await getEmployeeData(hotelId);
  }

  useEffect(() => {
    fetchOwnerEmployeeData();
  }, [hotelId]);

  // const handleGridClick = (hotelData: any) => {
  //   newHotelDataWindow(<ShowRoomDataOwner hotelData={hotelData} hotelId={hotelId}/>)
  // };

  return (
    <>
      {EmployeeData.map((hotel) => (
          <Grid container
          className='containerTabs'
          spacing={3}
          // onClick={() => handleGridClick(hotel)}
          >
            <Grid item xs={4}>
              <TextfieldComponent value={hotel.EmployeeUser.username || ''} helpertext={"Employee Name"}/>
            </Grid>
            <Grid item xs={4}>
              <TextfieldComponent value={hotel.jobName || ''} helpertext={"Job Name"}/>
            </Grid>
            <Grid item xs={4}>
              <TextfieldComponent value={hotel.jobTitle || ''} helpertext={"Job Title"}/>
            </Grid>
            <Grid item xs={12}>
              <TextfieldComponentDescription value={hotel.jobDescription || ''} size={4}/>
            </Grid>
          </Grid>
      ))}
    </>
  );
}

export default ShowHotelEmployees;