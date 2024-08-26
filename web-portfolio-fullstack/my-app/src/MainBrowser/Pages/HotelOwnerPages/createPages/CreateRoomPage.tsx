import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import React from 'react';
import ShowRoomDataOwner from '../HotelDataOverTabs/ShowRoomDataOwner';
import { newHotelDataWindow } from '../ShowHotelDataOwnerTabs';
import { FormBoolean } from '../HotelDataOverTabs/CreateFunctions';

interface ResponsiveAppBarProps {
  hotelId: string;
}

type FormStateString = {
  RoomNumber: string;
  RoomName: string;
  Employee: string;
  HotelDescription: string;
  [key: string]: string;
};

type FormStateNumber = {
  BigBed: number;
  SmallBed: number;
  Rooms: number;
  [key: number]: string;
};

type FormStateMessage = {
  RoomNumber: string;
  RoomName: string;
  Employee: string;
  HotelDescription: string;
  BigBed: string;
  SmallBed: string;
  Rooms: string;
  [key: string]: string;
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

const validateFieldErrors = (name: string) => {
  let isError = true;
  _setFormErrors((prevErrors) => ({
    ...prevErrors,
    [name]: isError,
  }));
};

const validateFieldmessage = (name: string, message: string) => {
  _setFormMessage((prevErrors) => ({
    ...prevErrors,
    [name]: message,
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
    BigBed: "",
    SmallBed: "",
    Rooms: "",
  });

  _setFormErrors({
    RoomNumber: false,
    RoomName: false,
    Employee: false,
    HotelDescription: false,
    BigBed: false,
    SmallBed: false,
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
      BigBeds: Number(formStateNumber.BigBed),
      SmallBeds: Number(formStateNumber.SmallBed),
      Rooms: Number(formStateNumber.Rooms),
      Kitchen: checkboxes.Kitchen,
      Wifi: checkboxes.Wifi,
      Breakfast: checkboxes.Breakfast,
      Roomservice: checkboxes.Roomservice,
      Animals: checkboxes.Animals,
    };
    console.log(credentials);
    await resetErrorAndMessage();
    try {
      const response = await fetch("http://localhost:3000/hotels/CreateRoom", {
        method: "POST",
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
        newHotelDataWindow(<ShowRoomDataOwner hotelData={data["hotelData"]} hotelId={hotelId}/>)
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
    BigBed: "",
    SmallBed: "",
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
    BigBed: 0,
    SmallBed: 0,
    Rooms: 0,
  });
  const handleOnChangeValueNumber = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setFormStateNumber((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      validateFieldErrors(name)
      validateFieldmessage(name, "only use numbers")
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
      [name]: checked,
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
          control={
            <Checkbox 
              checked={checkboxes.Kitchen}
              onChange={handleCheckboxChange}  // Ensure this line is correct
              name="Kitchen"  // Ensure the name matches the state key
            />
          }
          label="Kitchen"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
          required
          control={<Checkbox 
            checked={checkboxes.Wifi}
            onChange={handleCheckboxChange}
            name="Wifi"
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
            name="Breakfast"
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
            name="Roomservice"
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
            name="Shower"
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
            name="Animals"
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
          error={!!formErrors.BigBed}
          helperText={formMessage.BigBed}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          label="Small Beds"
          className="gridTextfieldInput"
          fullWidth
          name="SmallBed"
          style={{ marginTop: 10 }}
          value={formStateNumber.SmallBed}
          onChange={handleOnChangeValueNumber}
          error={!!formErrors.SmallBed}
          helperText={formMessage.SmallBed}
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