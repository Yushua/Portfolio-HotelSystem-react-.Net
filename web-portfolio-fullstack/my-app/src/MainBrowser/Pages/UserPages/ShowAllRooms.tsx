
import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormBoolean } from '../EditData/EditHotelRoomData';
import ShowAllRoomData from './SearchForRooms';
type FormStateString = {
  hotelRoomNumber: string;
  hotelRoomName: string;
  hotelRoomEmployee: string;
  [key: string]: string;
};

type FormStateNumber = {
  BigBed: number;
  SmalBed: number;
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
  BigBed: string;
  SmalBed: string;
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
      _setFilteredHotelsRooms(data["Data"])
      console.log(data)
    }
    return response;
  } catch (error: any) {
  }
}

var _setHotelsRooms: React.Dispatch<React.SetStateAction<any[]>>
var _setFilteredHotelsRooms: React.Dispatch<React.SetStateAction<any[]>>
var _setFormErrors: React.Dispatch<React.SetStateAction<FormBoolean>>
var _setFormMessage: React.Dispatch<React.SetStateAction<FormStateMessage>>

function ShowAllHotelRooms() {

  const [hotelsRooms, setHotelsRooms] = useState<any[]>([]);
  _setHotelsRooms = setHotelsRooms;

  const [filteredHotelsRooms, setFilteredHotelsRooms] = useState<any[]>([]);
  _setFilteredHotelsRooms = setFilteredHotelsRooms

  const [formStateString, setFormStateString] = React.useState<FormStateString>({
    hotelRoomNumber: "",
    hotelRoomName: "",
    hotelRoomEmployee: "",
  });

  const [formStateNumber, setFormStateNumber] = React.useState<FormStateNumber>({
    BigBed: 0,
    SmalBed: 0,
    Rooms: 0,
  });

  const [checkboxes, setCheckboxes] = React.useState<FormStateBoolean>({
    Kitchen: false,
    Wifi: false,
    Breakfast: false,
    Roomservice: false,
    Shower: false,
    Animals: false,
  });

  const filterRooms = () => {
    const filtered = hotelsRooms.filter((room) => {
      for (const key in checkboxes) {
        if (checkboxes[key] && !room[key]) {
          return false;
        }
      }
      for (const key in formStateString) {
        const formValue = formStateString[key];
        if (
          formValue &&
          formValue.trim() !== "" &&
          room[key] !== undefined && // Check if room[key] is not undefined
          !room[key].toString().toLowerCase().includes(formValue.trim().toLowerCase())
        ) {
          return false;
        }
      }

      // Number filter
      for (const key in formStateNumber) {
        const formValue = formStateNumber[key];
        const roomKey = key;
        if (formValue !== 0 && room[roomKey] !== formValue) {
          return false;
        }
      }

      return true;
    });

    setFilteredHotelsRooms(filtered);
  };

  useEffect(() => {
    filterRooms();
  }, [formStateString, formStateNumber, checkboxes]);

  const [formErrors, setFormErrors] = React.useState<FormBoolean>({});
  const [formMessage, setFormMessage] = React.useState<FormStateMessage>({
    BigBed: "",
    SmalBed: "",
    Rooms: "",
  });
  _setFormErrors = setFormErrors;
  _setFormMessage = setFormMessage;

  const handleOnChangeValueString = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>  {
    const { name, value } = event.target;
    resetErrorAndMessage()
    setFormStateString({
      ...formStateString,
      [name]: value,
    });
    await filterRooms()
  };

  async function resetErrorAndMessage(){
    _setFormMessage({
      hotelRoomNumber: "",
      hotelRoomName: "",
      hotelRoomEmployee: "",
      HotelDescription: "",
      BigBed: "",
      SmalBed: "",
      Rooms: "",
    });
  
    _setFormErrors({
      hotelRoomNumber: false,
      hotelRoomName: false,
      hotelRoomEmployee: false,
      HotelDescription: false,
      BigBed: false,
      SmalBed: false,
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

  const fetchOwnerHotelsRooms = async () => {
    await getAllRooms();
  }

  useEffect(() => {
    fetchOwnerHotelsRooms();
  }, []);

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
          name="hotelRoomNumber"
          style={{ marginTop: 10 }}
          value={formStateString.hotelRoomNumber}
          onChange={handleOnChangeValueString}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          label="Room Name"
          className="gridTextfieldInput"
          fullWidth
          name="hotelRoomName"
          style={{ marginTop: 10 }}
          value={formStateString.hotelRoomName}
          onChange={handleOnChangeValueString}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          label="hotelRoomEmployee"
          className="gridTextfieldInput"
          fullWidth
          name="hotelRoomEmployee"
          style={{ marginTop: 10 }}
          value={formStateString.hotelRoomEmployee}
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
          name="BigBed"
          style={{ marginTop: 10 }}
          value={formStateNumber.BigBed}
          onChange={handleOnChangeValueNumber}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          label="Small Beds"
          className="gridTextfieldInput"
          fullWidth
          name="SmalBed"
          style={{ marginTop: 10 }}
          value={formStateNumber.SmalBed}
          onChange={handleOnChangeValueNumber}
          error={!!formErrors.SmalBed}
          helperText={formMessage.SmalBed}
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

      <ShowAllRoomData hotelRoom={filteredHotelsRooms}/>
    </>
  );
}

export default ShowAllHotelRooms;