
import { Grid } from '@mui/material';
import React from 'react';
import TextfieldComponent from '../Components/TextfieldComponent';
import TextfieldComponentDescription from '../Components/TextfieldComponentDescription';

  /* 
  on click newWindow(<howRoomDataUser roomId={roomId})
  */

  interface ResponsiveAppBarProps {
    hotelRooms: any[];
  }
  
function ShowAllRoomData({ hotelRooms }: ResponsiveAppBarProps) {
  return (
    <>
      {hotelRooms.map((hotel) => (
        <Grid container
        className='containerTabsDataRoomsData'
        spacing={3}
        // onClick={() => handleGridClick(hotel)}
        >
          <Grid item xs={4}>
            <TextfieldComponent value={hotel.hotelRoomNumber} helpertext={"Room Number"}/>
          </Grid>
          <Grid item xs={4}>
            <TextfieldComponent value={hotel.hotelRoomName} helpertext={"Room Name"}/>
          </Grid>
          <Grid item xs={4}>
            <TextfieldComponent value={hotel.hotelRoomEmployee} helpertext={"Assigned Employee"}/>
          </Grid>
          <Grid item xs={12}>
            <TextfieldComponentDescription value={hotel.hotelRoomDescription} size={4}/>
          </Grid>
        </Grid>
    ))}
    </>
    //when clicked, Dialogue with the data send

  );
}

export default ShowAllRoomData;