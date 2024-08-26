
import { Button, Checkbox, Dialog, DialogActions, DialogTitle, FormControlLabel, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import TextfieldComponent from '../Components/TextfieldComponent';
import TextfieldComponentDescription from '../Components/TextfieldComponentDescription';
import { newWindow } from '../../../App';
import BookRoom from './BookRoom';

async function PatchBookRoom(HotelRoom: any, startDate: Date, beginDate: Date){

  try {
    const response = await fetch("http://localhost:3000/hotels/BookRoom", {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
    });
    if (!response.ok) {
      //handleError
    }
    else {
      const data = await response.json();
      console.log(data)
    }
    return response;
  } catch (error: any) {
  }
}

  interface ResponsiveAppBarProps {
    hotelRoom: any[];
  }
  
function ShowAllRoomData({ hotelRoom }: ResponsiveAppBarProps) {

  const [HotelRoom, setHotelRoom] = useState<any>([]);

  const [open, setOpen] = useState<boolean>(false);

  const handleBooking= async (hotel: any) => {
    setHotelRoom(hotel);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBookRoom = () => {
    setOpen(false);
    newWindow(<BookRoom hotelRoom={HotelRoom}/>)
  };
  return (
    <>
      {hotelRoom.map((hotel) => (
        <Grid container
        className='containerTabsDataRoomsData'
        spacing={3}
        onClick={() => handleBooking(hotel)}
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

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogTitle>Book room</DialogTitle>
        <Grid container className='dialogContainer' spacing={6} >
          
          <Grid item xs={4}>
            <TextField
              required
              label="Room Number"
              className="gridTextfieldInput"
              fullWidth
              name="RoomNumber"
              style={{ marginTop: 10 }}
              value={HotelRoom.hotelRoomNumber}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Room Name"
              className="gridTextfieldInput"
              fullWidth
              name="RoomName"
              style={{ marginTop: 10 }}
              value={HotelRoom.hotelRoomName}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Employee"
              className="gridTextfieldInput"
              fullWidth
              name="Employee"
              style={{ marginTop: 10 }}
              value={HotelRoom.hotelRoomEmployee}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              label="Hotel Description"
              className="gridTextfieldDescription"
              fullWidth
              name="HotelDescription"
              multiline
              rows={4}
              style={{ marginTop: 10 }}
              value={HotelRoom.hotelRoomDescription}
              />
            </Grid>

          <Grid item xs={2}>
            <FormControlLabel
              required
              control={<Checkbox 
                checked={HotelRoom.Kitchen}
              />}
              label="Kitchen"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              required
              control={<Checkbox 
                checked={HotelRoom.Wifi}
              />}
              label="Wifi"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              required
              control={<Checkbox 
                checked={HotelRoom.Breakfast}
              />}
              label="Breakfast"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              required
              control={<Checkbox 
                checked={HotelRoom.Roomservice}
              />}
              label="Roomservice"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              required
              control={<Checkbox 
                checked={HotelRoom.Shower}
              />}
              label="Shower"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              required
              control={<Checkbox 
                checked={HotelRoom.Animals}
              />}
              label="Animals"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Big Beds"
              className="gridTextfieldInput"
              fullWidth
              name="BigBeds"
              style={{ marginTop: 10 }}
              value={HotelRoom.BigBed}

            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Small Beds"
              className="gridTextfieldInput"
              fullWidth
              name="SmallBeds"
              style={{ marginTop: 10 }}
              value={HotelRoom.SmallBed}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Rooms"
              className="gridTextfieldInput"
              fullWidth
              name="Rooms"
              style={{ marginTop: 10 }}
              value={HotelRoom.Rooms}
            />
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleBookRoom} color="primary">
            Book
          </Button>
        </DialogActions>
      </Dialog>
    </>

    

    //when clicked, Dialogue with the data send

  );
}

export default ShowAllRoomData;