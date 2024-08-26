
import React, { useEffect, useState } from 'react';
import TextfieldComponent from '../Components/TextfieldComponent';
import TextfieldComponentDescription from '../Components/TextfieldComponentDescription';
import { Button, Checkbox, Dialog, DialogActions, DialogTitle, FormControlLabel, Grid, TextField } from '@mui/material';
import { DateField, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

async function ShowAllUserBookings(){
  try {
    const response = await fetch("http://localhost:3000/hotels/ShowAllUserBookings", {
      method: "POST",
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
      _setBookings(data["BookingData"]);
    }
    return response;
  } catch (error: any) {
  }
}

var _setBookings: React.Dispatch<React.SetStateAction<any[]>>

function AllBookings() {

  const [Bookings, setBookings] = useState<any[]>([]);
  _setBookings = setBookings;

  useEffect(() => {
    ShowAllUserBookings();
  }, []);
  
  const [Open, setOpen] = useState<boolean>(false);
  const [BookingData, setBookingData] = useState<any>({
    hotelRoom: {
      hotelRoomNumber: '',
      hotelRoomName: '',
      hotelRoomDescription: '',
      BigBed: 0,
      SmallBed: 0,
      Rooms: 0,
      Price: 0,
      Kitchen: false,
      Wifi: false,
      Breakfast: false,
      Roomservice: false,
      Shower: false,
      Animals: false,
    },
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    console.log("BookingData updated:");
    console.log(BookingData.hotelRoom);
  }, [BookingData]); // Dependency array, so it runs every time BookingData changes

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (Booking: any) => {
    setBookingData(Booking);  // Directly set the state
    setOpen(true);
  };

  const handleDeleteBooking = () => {
    setOpen(false);
  };

  return (
    <>
    {Bookings.map((Booking) => (
      <Grid container
        className='containerTabsDataRoomsData'
        spacing={3}
        key={Booking.hotelRoomId}
        onClick={() => handleOpen(Booking)}
        >
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateField
                className="gridTextfieldInputDate"
                label="Start Date"
                value={new Date(Booking.startDate)}
                fullWidth
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateField
              className="gridTextfieldInputDate"
                label="End Date"
                value={new Date(Booking.endDate)}
                fullWidth
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <TextfieldComponent value={Booking.hotelRoom.hotelRoomNumber || ''} helpertext={"Room Number"}/>
          </Grid>
          <Grid item xs={3}>
            <TextfieldComponent value={Booking.hotelRoom.hotelRoomName || ''} helpertext={"Room Name"}/>
          </Grid>
          <Grid item xs={12}>
            <TextfieldComponentDescription value={Booking.hotelRoom.hotelRoomDescription || ''} size={4}/>
          </Grid>
        </Grid>
    ))}

      <Dialog open={Open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogTitle>Room Data</DialogTitle>
        <Grid container className='dialogContainer' spacing={6}>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                className="gridTextfieldInputDate"
                value={BookingData.startDate ? new Date(BookingData.startDate) : null}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                className="gridTextfieldInputDate"
                value={BookingData.endDate ? new Date(BookingData.endDate) : null}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={3}>
            <TextfieldComponent value={BookingData.hotelRoom?.hotelRoomNumber || ''} helpertext={"Room Number"}/>
          </Grid>
          <Grid item xs={3}>
            <TextfieldComponent value={BookingData.hotelRoom?.hotelRoomNumber || ''} helpertext={"Room Number"}/>
          </Grid>
          <Grid item xs={12}>
          <TextfieldComponentDescription value={BookingData.hotelRoom?.hotelRoomDescription || ''} size={4}/>
          </Grid>
          <Grid item xs={3}>
            <TextfieldComponent value={BookingData.hotelRoom.Price || '1'} helpertext={"Price"}/>
          </Grid>
          <Grid item xs={3}>
            <TextfieldComponent value={BookingData.hotelRoom?.Rooms || ''} helpertext={"Rooms"}/>
          </Grid>
          <Grid item xs={3}>
            <TextfieldComponent value={BookingData.hotelRoom?.BigBed || ''} helpertext={"BigBed"}/>
          </Grid>
          <Grid item xs={3}>
            <TextfieldComponent value={BookingData.hotelRoom?.SmallBed || ''} helpertext={"SmallBed"}/>
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteBooking} color="primary">
            Delete Booking
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AllBookings;