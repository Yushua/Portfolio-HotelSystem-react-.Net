
import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { newDashboardWindow } from '../DashboardPage';
import ShowHotelDataOwner from './ShowHotelDataOwner';
import EditHotelData from './EditHotelData';

async function getOwnerHotelData(){
  try {
    const response = await fetch("http://localhost:3000/hotels/HotelOwner", {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
    });
    if (!response.ok) {
      if (response.status === 404){
        const errorData = await response.json();
      }
    }
    else {
      const data = await response.json();
      console.log(data["userWithHotels"])
      _setHotels(data["userWithHotels"])
    }
    return response;
  } catch (error: any) {
  }
}

var _setHotels: React.Dispatch<React.SetStateAction<any>>

function ShowAllOwnerHotels() {
  const [hotels, setHotels] = useState<any[]>([]);
  _setHotels = setHotels;

  const fetchOwnerHotels = async () => {
    await getOwnerHotelData();
  }

  useEffect(() => {
    fetchOwnerHotels();
  }, []);

  return (
    <>
      <Grid container className='container' spacing={6}>
      {hotels.map((hotel) => (
        <Grid item xs={4}>
          
          <TextField
            label={hotel.hotelName}
            className="gridTextfieldInput"
            fullWidth
            style={{ marginTop: 10 }}
          />
          <TextField
            label={hotel.hotelOwner}
            className="gridTextfieldInput"
            fullWidth
            style={{ marginTop: 10 }}
          />
          <TextField
            label={hotel.hotelDescription}
            className="gridTextfieldInput"
            fullWidth
            rows={4}
            style={{ marginTop: 10 }}
          />
          <Grid container spacing={6}>
            <Grid item xs={2}>
            <Button
              variant="contained"
              style={{ marginTop: 10 }}
              onClick={() => newDashboardWindow(<EditHotelData
                hotelId={hotel.hotelId}
                hotelName={hotel.hotelName}
                hotelDescription={hotel.hotelDescription}
                />)}
            >edit</Button>
            </Grid>
            <Grid item xs={2}>
            <Button
              variant="contained"
              style={{ marginTop: 10 }}
              onClick={() => newDashboardWindow( <ShowHotelDataOwner hotelId={hotel.hotelId}/>)}
            >Check</Button>
            </Grid>
          </Grid>
      </Grid>
      ))}
      </Grid>
    </>
  );
}

export default ShowAllOwnerHotels;