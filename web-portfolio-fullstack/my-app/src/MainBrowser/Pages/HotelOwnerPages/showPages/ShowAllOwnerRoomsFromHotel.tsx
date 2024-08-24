import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextfieldComponent from '../../Components/TextfieldComponent';
import TextfieldComponentDescription from '../../Components/TextfieldComponentDescription';
import { newHotelDataWindow } from '../ShowHotelDataOwnerTabs';
import ShowRoomDataOwner from '../HotelDataOverTabs/ShowRoomDataOwner';

async function getOwnerHotelRooms(hotelId: string){

  const credentials = {
    HotelId: hotelId,
  };

  try {
    const response = await fetch("http://localhost:3000/hotels/HotelRooms", {
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
      _setHotelsRooms(data["HotelRoomsData"])
      console.log(data)
    }
    return response;
  } catch (error: any) {
  }
}

interface ResponsiveAppBarProps {
  hotelId: string;
}

var _setHotelsRooms: React.Dispatch<React.SetStateAction<any>>

function ShowAllOwnerRoomsFromHotel({ hotelId }: ResponsiveAppBarProps) {

  const [hotelsRooms, setHotelsRooms] = useState<any[]>([]);
  _setHotelsRooms = setHotelsRooms;
  const fetchOwnerHotelsRooms = async () => {
    await getOwnerHotelRooms(hotelId);
  }

  useEffect(() => {
    fetchOwnerHotelsRooms();
  }, []);

  const handleGridClick = (hotelData: any) => {
    newHotelDataWindow(<ShowRoomDataOwner hotelData={hotelData} hotelId={hotelId}/>)
  };

  return (
    <>
      {hotelsRooms.map((hotel) => (
          <Grid container
          className='containerTabs'
          spacing={3}
          onClick={() => handleGridClick(hotel)}
          >
            <Grid item xs={4}>
              <TextfieldComponent value={hotel.hotelRoomNumber}/>
            </Grid>
            <Grid item xs={4}>
              <TextfieldComponent value={hotel.hotelRoomName}/>
            </Grid>
            <Grid item xs={4}>
              <TextfieldComponent value={hotel.hotelRoomEmployee}/>
            </Grid>
            <Grid item xs={12}>
              <TextfieldComponentDescription value={hotel.hotelRoomDescription} size={4}/>
            </Grid>
          </Grid>
      ))}
    </>
  );
}

export default ShowAllOwnerRoomsFromHotel;