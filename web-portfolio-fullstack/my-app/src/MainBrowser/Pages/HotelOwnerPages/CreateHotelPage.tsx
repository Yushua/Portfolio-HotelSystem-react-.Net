
import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { newDashboardWindow } from '../DashboardPage';
import ShowHotelDataOwner from './ShowHotelDataOwner';

async function sendData(HotelName: string, Description: string){
  const credentials = {
    HotelName: HotelName,
    Description: Description,
  };
  try {
    const response = await fetch("http://localhost:3000/hotels/CreateHotel", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      if (response.status === 404){
        const errorData = await response.json();
        _setHotelNameError(true)
        _setHotelNameMessage(errorData.message)
      }
    }
    else {
      const data = await response.json();
      newDashboardWindow(<ShowHotelDataOwner hotelId={data["hotelID"]}/>)
    }
    return response;
  } catch (error: any) {
  }
}

var _setHotelNameMessage: React.Dispatch<React.SetStateAction<string>>
var _setHotelNameError: React.Dispatch<React.SetStateAction<boolean>>

var _setHotelDescriptionMessage: React.Dispatch<React.SetStateAction<string>>
var _setHotelDescriptionError: React.Dispatch<React.SetStateAction<boolean>>
function CreateHotelPage() {

  const [HotelName, setHotelName] = useState<string>('');
  const [HotelNameMessage, setHotelNameMessage] = useState<string>('');
  _setHotelNameMessage = setHotelNameMessage
  const [HotelNameError, setHotelNameError] = useState<boolean>(false);
  _setHotelNameError = setHotelNameError

  const handleHotelNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHotelName(value);
  };

  const [HotelDescription, setHotelDescription] = useState<string>('');
  const [HotelDescriptionMessage, setHotelDescriptionMessage] = useState<string>('');
  _setHotelDescriptionMessage = setHotelDescriptionMessage
  const [HotelDescriptionError, setHotelDescriptionError] = useState<boolean>(false);
  _setHotelDescriptionError = setHotelDescriptionError

  const handleHotelDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHotelDescription(value);
  };

  const handleClickConfirm = async () => {
    var failure: Boolean = false;
    if (HotelName.length === 0){
      setHotelNameError(true)
      setHotelNameMessage("Fill in the Hotel Name");
      failure = true;
    }
    if (HotelDescription.length === 0){
      setHotelDescriptionError(true)
      setHotelDescriptionMessage("Fill in the description");
      failure = true;
    }

    if (!failure){
      setHotelNameError(false)
      setHotelDescriptionError(false)
      sendData(HotelName, HotelDescription);
    }
  }

  return (
    <>
      <Grid container className='container' spacing={6}>
        <Grid item xs={4}>
          <TextField
            required
            label="Hotel Name"
            className="gridTextfieldInput"
            fullWidth
            style={{ marginTop: 10 }}
            helperText={HotelNameMessage}
            error={HotelNameError}
            onChange={handleHotelNameChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Hotel destription"
            className="gridTextfieldDescription"
            fullWidth
            multiline
            rows={4}
            style={{ marginTop: 10 }}
            helperText={HotelDescriptionMessage}
            error={HotelDescriptionError}
            onChange={handleHotelDescriptionChange}
          />
        </Grid>

      </Grid>
      <Grid container>
        <Grid item xs={4} style={{ marginTop: 20 }}>
            <Button onClick={handleClickConfirm} variant="contained">Submit</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default CreateHotelPage;