
import { CheckBox } from '@mui/icons-material';
import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import React from 'react';

interface ResponsiveAppBarProps {
  hotelId: string;
}
function CreateRoomPage({ hotelId }: ResponsiveAppBarProps) {
  return (
    <>
    <Grid container className='container' spacing={6}>
      <Grid item xs={4}>
        <TextField
          required
          label="Room Number"
          className="gridTextfieldInput"
          fullWidth
          style={{ marginTop: 10 }}
          // helperText={HotelNameMessage}
          // error={HotelNameError}
          // onChange={handleHotelNameChange}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          label="Room Name"
          className="gridTextfieldInput"
          fullWidth
          style={{ marginTop: 10 }}
          // helperText={HotelNameMessage}
          // error={HotelNameError}
          // onChange={handleHotelNameChange}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          label="Employee"
          className="gridTextfieldInput"
          fullWidth
          style={{ marginTop: 10 }}
          // helperText={HotelNameMessage}
          // error={HotelNameError}
          // onChange={handleHotelNameChange}
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
            // helperText={HotelDescriptionMessage}
            // error={HotelDescriptionError}
            // onChange={handleHotelDescriptionChange}
          />
        </Grid>

      <Grid item xs={2}>
        <FormControlLabel
        required
        control={<Checkbox />}
        label="Kitchen"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
        required
        control={<Checkbox />}
        label="Wifi"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
        required
        control={<Checkbox />}
        label="breakfast"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
        required
        control={<Checkbox />}
        label="RoomService"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
        required
        control={<Checkbox />}
        label="Shower"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
        required
        control={<Checkbox />}
        label="Animals"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          label="Big beds"
          className="gridTextfieldInput"
          fullWidth
          style={{ marginTop: 10 }}
          // helperText={HotelNameMessage}
          // error={HotelNameError}
          // onChange={handleHotelNameChange}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          label="Smal Beds"
          className="gridTextfieldInput"
          fullWidth
          style={{ marginTop: 10 }}
          // helperText={HotelNameMessage}
          // error={HotelNameError}
          // onChange={handleHotelNameChange}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          label="Rooms"
          className="gridTextfieldInput"
          fullWidth
          style={{ marginTop: 10 }}
          // helperText={HotelNameMessage}
          // error={HotelNameError}
          // onChange={handleHotelNameChange}
        />
      </Grid>
    </Grid>
    </>
  );
}

export default CreateRoomPage;