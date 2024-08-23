
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import { newDashboardWindow } from '../DashboardPage';
import ShowHotelDataOwner from '../HotelOwnerPages/ShowHotelDataOwner';
async function PatchHotelData(hotelData: ResponsiveAppBarProps){
  const credentials = {
    HotelName: hotelData.hotelName,
    Description: hotelData.hotelDescription,
    HotelId: hotelData.hotelId
  };
  try {
    const response = await fetch("http://localhost:3000/hotels/PatchHotel", {
      method: "PATCH",
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
      // const data = await response.json();
    }
    return response;
  } catch (error: any) {
  }  
  newDashboardWindow(<ShowHotelDataOwner hotelId={hotelData.hotelId}/>)
}

var _setHotelNameMessage: React.Dispatch<React.SetStateAction<string>>
var _setHotelNameError: React.Dispatch<React.SetStateAction<boolean>>

interface ResponsiveAppBarProps {
  hotelId: string;
  hotelName: string;
  hotelDescription: string;
}
function EditHotelData({ hotelId, hotelName, hotelDescription }: ResponsiveAppBarProps) {
  const [open, setOpen] = useState(true);
  const [hotelData, setHotelData] = useState({
    hotelId,
    hotelName,
    hotelDescription
  });

  const handleClose = () => {
    setOpen(false);
    newDashboardWindow(<ShowHotelDataOwner hotelId={hotelId}/>)
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setHotelData({
      ...hotelData,
      [name]: value,
    });
  };
  const [HotelNameMessage, setHotelNameMessage] = useState<string>('');
  _setHotelNameMessage = setHotelNameMessage
  const [HotelNameError, setHotelNameError] = useState<boolean>(false);
  _setHotelNameError = setHotelNameError

  const [HotelDescriptionMessage, setHotelDescriptionMessage] = useState<string>('');
  const [HotelDescriptionError, setHotelDescriptionError] = useState<boolean>(false);

  const handleSave = async () => {
    var failure: Boolean = false;
    if (hotelData.hotelName.length === 0){
      setHotelNameError(true)
      setHotelNameMessage("Fill in the Hotel Name");
      failure = true;
    }
    if (hotelData.hotelDescription.length === 0){
      setHotelDescriptionError(true)
      setHotelDescriptionMessage("Fill in the description");
      failure = true;
    }
    if (!failure){
      await PatchHotelData(hotelData);
      handleClose();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Hotel</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Hotel Name"
            name="hotelName"
            value={hotelData.hotelName}
            helperText={HotelNameMessage}
            error={HotelNameError}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Hotel Description"
            name="hotelDescription"
            value={hotelData.hotelDescription}
            helperText={HotelDescriptionMessage}
            error={HotelDescriptionError}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditHotelData;