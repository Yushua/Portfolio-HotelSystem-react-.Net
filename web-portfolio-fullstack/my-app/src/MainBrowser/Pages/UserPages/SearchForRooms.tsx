
import { Button, Checkbox, Dialog, DialogActions, DialogTitle, FormControlLabel, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import TextfieldComponent from '../Components/TextfieldComponent';
import TextfieldComponentDescription from '../Components/TextfieldComponentDescription';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

async function PatchBookRoom(HotelRoom: any, startDate: Date, endDate: Date){
  const credentials = {
    hotelRoomId: HotelRoom.hotelRoomId,
    startDate:  startDate,
    endDate: endDate,
  };
  console.log(startDate)
  console.log(endDate)
  try {
    const response = await fetch("http://localhost:3000/hotels/BookRoomByUser", {
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
      console.log(data)
    }
    return response;
  } catch (error: any) {
  }
}

  interface ResponsiveAppBarProps {
    hotelRoom: any[];
  }

  const getTodayDate = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const getMinDate = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  };

  const maxMinDate = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  };

function ShowAllRoomData({ hotelRoom }: ResponsiveAppBarProps) {

  const [HotelRoom, setHotelRoom] = useState<any>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(getTodayDate());
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(maxMinDate());
  const [ErrorMessageStartDate, setErrorMessageStartDate] = useState<string>("");
  const [ErrorMessageEndDate, setErrorMessageEndDate] = useState<string>("");

  const handleBooking= async (hotel: any) => {
    setHotelRoom(hotel);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBookRoom = async () => {
    setOpen(false);
    //afer
    await PatchBookRoom(HotelRoom, selectedStartDate as Date, selectedEndDate as Date);
  };

  const handleOnDateChange = (date: Date | null, type: string) => {

    var error: boolean = false;
    for (const booking of HotelRoom.bookings) {
      if (date !== null && date >= booking.startDate + 1 && date <= booking.startDate + 1){
        if (type === 'Start') {
          setErrorMessageStartDate("Start Date Already occupied");
        } else if (type === 'End') {
          setErrorMessageEndDate("End Date Already occupied");
        }
        error = true
        break;
      }
    }

    if (type === 'Start' && error === false) {
      setSelectedStartDate(date);
    } else if (type === 'End' && error === false) {
      setSelectedEndDate(date);
    }
  }


  return (
    <>
      {hotelRoom.map((hotel) => (
        <Grid container
        className='containerTabsDataRoomsData'
        spacing={3}
        onClick={() => handleBooking(hotel)}
        key={hotel.hotelRoomId}
        >
          <Grid item xs={6}>
            <TextfieldComponent value={hotel.hotelRoomNumber} helpertext={"Room Number"}/>
          </Grid>
          <Grid item xs={6}>
            <TextfieldComponent value={hotel.hotelRoomName} helpertext={"Room Name"}/>
          </Grid>
          <Grid item xs={12}>
            <TextfieldComponentDescription value={hotel.hotelRoomDescription} size={4}/>
          </Grid>
        </Grid>
    ))}

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogTitle>Book room</DialogTitle>
        <Grid container className='dialogContainer' spacing={6} >
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={selectedStartDate}
                onChange={(newValue) => handleOnDateChange(newValue, 'Start')}
                minDate={getMinDate()}
                slotProps={{
                  textField: {
                    helperText: ErrorMessageStartDate,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={selectedEndDate}
                onChange={(newValue) => handleOnDateChange(newValue, 'End')}
                minDate={maxMinDate()}
                slotProps={{
                  textField: {
                    helperText: ErrorMessageEndDate,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={3}>
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
          <Grid item xs={3}>
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
          <Grid item xs={3}>
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
          <Grid item xs={3}>
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
          <Grid item xs={3}>
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
          <Grid item xs={3}>
            <TextField
              required
              label="Price"
              className="gridTextfieldInput"
              fullWidth
              name="Price"
              style={{ marginTop: 10 }}
              value={HotelRoom.Price}
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