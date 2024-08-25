import { Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import TextfieldComponent from '../../Components/TextfieldComponent';
import { newDashboardWindow } from '../../DashboardPage';
import EditHotelRoomData from '../../EditData/EditHotelRoomData';
import { newHotelDataWindow } from '../ShowHotelDataOwnerTabs';
import TextfieldComponentDescription from '../../Components/TextfieldComponentDescription';

interface ResponsiveAppBarProps {
  hotelData?: any;
  hotelId: string;
}

function ShowRoomDataOwner({ hotelData, hotelId }: ResponsiveAppBarProps) {

  return (
    <>
    <Grid container
      className='containerTabsData'
      spacing={3}
      >
        <Grid item xs={4}>
          <TextfieldComponent value={hotelData.hotelRoomNumber} helpertext={"Room Number"}/>
        </Grid>
        <Grid item xs={4}>
          <TextfieldComponent value={hotelData.hotelRoomName} helpertext={"Room Name"}/>
        </Grid>
        <Grid item xs={4}>
          <TextfieldComponent value={hotelData.hotelRoomEmployee} helpertext={"Assigned Employee"}/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox
            defaultChecked
            checked={hotelData.Kitchen}
            />} label="Kitchen" />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox
            defaultChecked
            checked={hotelData.Wifi}
            />} label="Wifi" />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox
            defaultChecked
            checked={hotelData.Breakfast}
            />} label="Breakfast" />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox
            defaultChecked
            checked={hotelData.Roomservice}
            />} label="Roomservice" />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel control={<Checkbox
            defaultChecked
            checked={hotelData.Animals}
            />} label="Animals" />
        </Grid>
        <Grid item xs={4}>
          <TextfieldComponent value={hotelData.BigBed} helpertext={"Big Beds"}/>
        </Grid>
        <Grid item xs={4}>
          <TextfieldComponent value={hotelData.SmallBed} helpertext={"Small Beds"}/>
        </Grid>
        <Grid item xs={4}>
          <TextfieldComponent value={hotelData.Rooms} helpertext={"Amount Rooms"}/>
        </Grid>
        <Grid item xs={12}>
          <TextfieldComponentDescription value={hotelData.roomDescription} size={4}/>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => newHotelDataWindow(<EditHotelRoomData
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