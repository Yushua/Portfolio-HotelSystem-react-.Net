import { Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import React from 'react';
import TextfieldComponent from '../../Components/TextfieldComponent';
import TextfieldComponentDescription from '../../Components/TextfieldComponentDescription';
import { CheckBox } from '@mui/icons-material';
import { newDashboardWindow } from '../../DashboardPage';
import EditHotelRoomData from '../../EditData/EditHotelRoomData';

interface ResponsiveAppBarProps {
  hotelData?: any;
  hotelId: string;
}

//check out the room id, if its empty, nothing is here.
//if its filled, send it to the backend.
//simple. it shows all the data
//here you can edit the room
function ShowRoomDataOwner({ hotelData, hotelId }: ResponsiveAppBarProps) {

  return (
    <>
    <Grid container
      className='containerTabsData'
      spacing={3}
      >
        <Grid item xs={4}>
          <TextfieldComponent value={hotelData.hotelRoomNumber}/>
        </Grid>
        <Grid item xs={4}>
          <TextfieldComponent value={hotelData.hotelRoomName}/>
        </Grid>
        <Grid item xs={4}>
          <TextfieldComponent value={hotelData.hotelRoomEmployee}/>
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel control={<Checkbox
            defaultChecked
            checked={hotelData.Kitchen}
            />} label="Kitchen" />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel control={<Checkbox
            defaultChecked
            checked={hotelData.Wifi}
            />} label="Wifi" />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel control={<Checkbox
            defaultChecked
            checked={hotelData.Breakfast}
            />} label="Breakfast" />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel control={<Checkbox
            defaultChecked
            checked={hotelData.Roomservice}
            />} label="Roomservice" />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel control={<Checkbox
            defaultChecked
            checked={hotelData.Animals}
            />} label="Animals" />
        </Grid>
        <Grid item xs={4}>
          <TextfieldComponent value={hotelData.BigBed}/>
        </Grid>
        <Grid item xs={4}>
          <TextfieldComponent value={hotelData.SmallBed}/>
        </Grid>
        <Grid item xs={4}>
          <TextfieldComponent value={hotelData.Rooms}/>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => newDashboardWindow(<EditHotelRoomData
              hotelRoomData={hotelData}
              hotelId={hotelId}
              />)}
          >edit</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ShowRoomDataOwner;