

import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import React from 'react';

interface ResponsiveAppBarProps {
  hotelId: string;
}

type FormStateString = {
  RoomNumber: string;
  RoomName: string;
  Employee: string;
  HotelDescription: string;
  [key: string]: string; // This allows for dynamic form fields
};

type FormStateNumber = {
  BigBeds: number;
  SmallBeds: number;
  Rooms: number;
  [key: number]: string; // This allows for dynamic form fields
};

type FormStateMessage = {
  RoomNumber: string;
  RoomName: string;
  Employee: string;
  HotelDescription: string;
  BigBeds: string;
  SmallBeds: string;
  Rooms: string;
  [key: string]: string; // This allows for dynamic form fields
};

type FormStateBoolean = {
  Kitchen: boolean,
  Wifi: boolean,
  Breakfast: boolean,
  Roomservice: boolean,
  Shower: boolean,
  Animals: boolean,
  [key: string]: boolean; // Allows additional properties with boolean values
};

type FormBoolean = {
  [key: string]: boolean; // This allows for dynamic keys representing each field's error state
};

const validateFieldErrors = (name: string) => {
  let isError = true;
  _setFormErrors((prevErrors) => ({
    ...prevErrors,
    [name]: isError, // Update the specific field's error state
  }));
};

const validateFieldmessage = (name: string, message: string) => {
  _setFormMessage((prevErrors) => ({
    ...prevErrors,
    [name]: message, // Update the specific field's error state
  }));
};

const handleErrors = (messages: string[], credentials: any) => {
  messages.forEach((message) => {
    const parts = message.split(' ', 2);
    if (credentials.hasOwnProperty(parts[0])) {
      validateFieldErrors(parts[0])
      validateFieldmessage(parts[0], message.slice(parts[0].length).trim())
    }
  });
};

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

async function createRoomHttp(
  hotelId: string,
  formStateString: FormStateString,
  formStateNumber: FormStateNumber,
  checkboxes: FormStateBoolean){

    const credentials = {
      HotelId: hotelId,
      RoomNumber: formStateString.RoomNumber,
      RoomName: formStateString.RoomName,
      Employee: formStateString.Employee,
      HotelDescription: formStateString.HotelDescription,
      BigBeds: formStateNumber.BigBeds,
      SmallBeds: formStateNumber.SmallBeds,
      Rooms: formStateNumber.Rooms,
      Kitchen: checkboxes.Kitchen,
      Wifi: checkboxes.Wifi,
      Breakfast: checkboxes.Breakfast,
      Roomservice: checkboxes.Roomservice,
      Animals: checkboxes.Animals,
    };

    await resetErrorAndMessage();
    try {
      const response = await fetch("http://localhost:3000/hotels/CreateRoom", {
        method: "PATCH",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        if (response.status === 400){
          const errorData = await response.json();
          handleErrors(errorData.message, credentials)
        }
      } else {
        const data = await response.json();
        //return to this page again
      }
      return response;
    } catch (error: any) {
      console.log(error)
    } 
}

var _setFormErrors: React.Dispatch<React.SetStateAction<FormBoolean>>
var _setFormMessage: React.Dispatch<React.SetStateAction<FormStateMessage>>

function CreateRoomPage({ hotelId }: ResponsiveAppBarProps) {

  const [formErrors, setFormErrors] = React.useState<FormBoolean>({});
  _setFormErrors = setFormErrors;

  const [formMessage, setFormMessage] = React.useState<FormStateMessage>({
    RoomNumber: "",
    RoomName: "",
    Employee: "",
    HotelDescription: "",
    BigBeds: "",
    SmallBeds: "",
    Rooms: "",
  });

  _setFormMessage = setFormMessage;
  const [formStateString, setFormStateString] = React.useState<FormStateString>({
    RoomNumber: "",
    RoomName: "",
    Employee: "",
    HotelDescription: "",
  });
  const handleOnChangeValueString = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormStateString({
      ...formStateString,
      [name]: value,
    });
  };

  const [formStateNumber, setFormStateNumber] = React.useState<FormStateNumber>({
    BigBeds: 0,
    SmallBeds: 0,
    Rooms: 0,
  });
  const handleOnChangeValueNumber = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setFormStateNumber((prevState) => ({
        ...prevState,
        [name]: value,
      }));
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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
  
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked, // Dynamically update the specific checkbox state
    }));
  };

  const handleSubmit = async () => {
    await createRoomHttp(hotelId, formStateString, formStateNumber, checkboxes);
  }
  return (
    <>
    <Grid container className='container' spacing={6}>
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
          error={!!formErrors.RoomNumber}
          helperText={formMessage.RoomNumber}
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
          error={!!formErrors.RoomName}
          helperText={formMessage.RoomName}
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
          error={!!formErrors.Employee}
          helperText={formMessage.Employee}
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
          value={formStateString.HotelDescription}
          onChange={handleOnChangeValueString}
          error={!!formErrors.HotelDescription}
          helperText={formMessage.HotelDescription}
          />
        </Grid>

      <Grid item xs={2}>
        <FormControlLabel
          required
          control={<Checkbox 
            checked={checkboxes.Kitchen}
            onChange={handleCheckboxChange}
          />}
          label="Kitchen"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
          required
          control={<Checkbox 
            checked={checkboxes.Wifi}
            onChange={handleCheckboxChange}
          />}
          label="Wifi"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
          required
          control={<Checkbox 
            checked={checkboxes.Breakfast}
            onChange={handleCheckboxChange}
          />}
          label="Breakfast"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
          required
          control={<Checkbox 
            checked={checkboxes.Roomservice}
            onChange={handleCheckboxChange}
          />}
          label="Roomservice"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
          required
          control={<Checkbox 
            checked={checkboxes.Shower}
            onChange={handleCheckboxChange}
          />}
          label="Shower"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
          required
          control={<Checkbox 
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
          error={!!formErrors.BigBeds}
          helperText={formMessage.BigBeds}

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
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={handleSubmit}
        >Submit</Button>
      </Grid>
    </Grid>
    </>
  );
}

export default CreateRoomPage;