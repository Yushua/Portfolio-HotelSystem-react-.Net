
import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormBoolean } from '../EditData/EditHotelRoomData';
import ShowAllRoomData from './SearchForRooms';
type FormStateString = {
  RoomNumber: string;
  RoomName: string;
  Employee: string;
  [key: string]: string;
};

type FormStateNumber = {
  BigBeds: number;
  SmallBeds: number;
  Rooms: number;
  [key: string]: number;
};

type FormStateBoolean = {
  Kitchen: boolean,
  Wifi: boolean,
  Breakfast: boolean,
  Roomservice: boolean,
  Shower: boolean,
  Animals: boolean,
  [key: string]: boolean;
};

type FormStateMessage = {
  BigBeds: string;
  SmallBeds: string;
  Rooms: string;
  [key: string]: string;
};

const validateFieldmessage = (name: string, message: string) => {
  _setFormMessage((prevErrors) => ({
    ...prevErrors,
    [name]: message,
  }));
};

const validateFieldErrors = (name: string) => {
  let isError = true;
  _setFormErrors((prevErrors) => ({
    ...prevErrors,
    [name]: isError,
  }));
};

async function getAllRooms(){
  try {
    const response = await fetch("http://localhost:3000/hotels/getAllRooms", {
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
      _setHotelsRooms(data["Data"])
      console.log(data)
    }
    return response;
  } catch (error: any) {
  }
}

var _setHotelsRooms: React.Dispatch<React.SetStateAction<any>>
var _setFormErrors: React.Dispatch<React.SetStateAction<FormBoolean>>
var _setFormMessage: React.Dispatch<React.SetStateAction<FormStateMessage>>

function ShowAllHotelRooms() {

  const [hotelsRooms, setHotelsRooms] = useState<any[]>([]);
  _setHotelsRooms = setHotelsRooms;

  const [filteredHotelsRooms, setFilteredHotelsRooms] = useState<any[]>([]);

  const filterRooms = async () => {
    const filtered = hotelsRooms.filter((room) => {
      for (const key in checkboxes) {
        if (checkboxes[key] && !room[key]) {
          return false;
        }
      }
      for (const key in formStateString) {
        if (formStateString[key] && formStateString[key].trim() !== "" && room[key] !== formStateString[key]) {
          return false;
        }
      }
      for (const key in formStateNumber) {
        const formValue = formStateNumber[key];
        if (room[key] !== formValue) {
          return false;
        }
      }
      return true;
    });
    console.log("roomfilter")
    console.log(filtered)
    setFilteredHotelsRooms(filtered);
  };

  const fetchOwnerHotelsRooms = async () => {
    await getAllRooms();
    await filterRooms();
  }

  useEffect(() => {
    fetchOwnerHotelsRooms();
  }, []);

  const [formErrors, setFormErrors] = React.useState<FormBoolean>({});
  const [formMessage, setFormMessage] = React.useState<FormStateMessage>({
    BigBeds: "",
    SmallBeds: "",
    Rooms: "",
  });
  _setFormErrors = setFormErrors;
  _setFormMessage = setFormMessage;


  const [formStateString, setFormStateString] = React.useState<FormStateString>({
    RoomNumber: "",
    RoomName: "",
    Employee: "",
  });

  const handleOnChangeValueString = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>  {
    const { name, value } = event.target;
    resetErrorAndMessage()
    setFormStateString({
      ...formStateString,
      [name]: value,
    });
    await filterRooms()
  };
  
  const [formStateNumber, setFormStateNumber] = React.useState<FormStateNumber>({
    BigBeds: 0,
    SmallBeds: 0,
    Rooms: 0,
  });

  async function resetErrorAndMessage(){
    _setFormMessage({
      RoomNumber: "",
      RoomName: "",
      Employee: "",
      HotelDescription: "",
      BigBeds: "",
      SmallBeds: "",
      Rooms: "",
    });
  
    _setFormErrors({
      RoomNumber: false,
      RoomName: false,
      Employee: false,
      HotelDescription: false,
      BigBeds: false,
      SmallBeds: false,
      Rooms: false,
    });
  }

  const handleOnChangeValueNumber = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    resetErrorAndMessage();
  
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setFormStateNumber((prevState) => ({
        ...prevState,
        [name]: value === "" ? 0 : Number(value), // Convert value to a number
      }));
      await filterRooms();
    } else {
      validateFieldErrors(name);
      validateFieldmessage(name, "only use numbers");
    }
  };

  const [checkboxes, setCheckboxes] = React.useState<FormStateBoolean>({
    Kitchen: false,
    Wifi: false,
    Breakfast: false,
    Roomservice: false,
    Shower: false,
    Animals: false,
  });
  
  const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = {
        ...prevCheckboxes,
        [name]: checked,
      };
      return updatedCheckboxes;
    });
    await filterRooms();
  };

  return (
    <>
      <Grid container
      className='containerTabsData'
      spacing={3}
      >
       <Grid item xs={4}>
        <TextField
          required
          label="Room Number"
          className="gridTextfieldInput"
          fullWidth
          name="RoomNumber"
          style={{ marginTop: 10 }}
          value={formStateString.RoomNumber}
          onChange={handleOnChangeValueString}
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
          value={formStateString.RoomName}
          onChange={handleOnChangeValueString}
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
          value={formStateString.Employee}
          onChange={handleOnChangeValueString}
        />
      </Grid>

      <Grid item xs={2}>
        <FormControlLabel
          control={
            <Checkbox 
              name="Kitchen"
              checked={checkboxes.Kitchen}
              onChange={handleCheckboxChange}
            />
          }
          label="Kitchen"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
          control={<Checkbox 
            name="Wifi"
            checked={checkboxes.Wifi}
            onChange={handleCheckboxChange}
          />}
          label="Wifi"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
          control={<Checkbox 
            name="Breakfast"
            checked={checkboxes.Breakfast}
            onChange={handleCheckboxChange}
          />}
          label="Breakfast"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
          control={<Checkbox
          name="Roomservice"
            checked={checkboxes.Roomservice}
            onChange={handleCheckboxChange}
          />}
          label="Roomservice"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
          control={<Checkbox
          name="Shower"
            checked={checkboxes.Shower}
            onChange={handleCheckboxChange}
          />}
          label="Shower"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
          control={<Checkbox
          name="Animals"
            checked={checkboxes.Animals}
            onChange={handleCheckboxChange}
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
          value={formStateNumber.BigBeds}
          onChange={handleOnChangeValueNumber}
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
          value={formStateNumber.SmallBeds}
          onChange={handleOnChangeValueNumber}
          error={!!formErrors.SmallBeds}
          helperText={formMessage.SmallBeds}
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
          value={formStateNumber.Rooms}
          onChange={handleOnChangeValueNumber}
          error={!!formErrors.Rooms}
          helperText={formMessage.Rooms}
        />
      </Grid>
      </Grid>

      <ShowAllRoomData hotelRooms={filteredHotelsRooms}/>
    </>
  );
}

export default ShowAllHotelRooms;