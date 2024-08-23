
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import { newDashboardWindow } from '../DashboardPage';
import ShowHotelDataOwner from '../HotelOwnerPages/ShowHotelDataOwner';
import ShowHotelDataOwnerTabs, { newHotelDataWindow } from '../HotelOwnerPages/ShowHotelDataOwnerTabs';

async function PatchHotelData(hotelData: ResponsiveAppBarProps){
  try {
    const response = await fetch("http://localhost:3000/hotels/PatchHotel", {
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
      // body: JSON.stringify(credentials),
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
}

async function DeleteRoom(roomId: string){

}

var _setHotelNameMessage: React.Dispatch<React.SetStateAction<string>>
var _setHotelNameError: React.Dispatch<React.SetStateAction<boolean>>

interface ResponsiveAppBarProps {
  hotelRoomData: any;
  hotelId:string;
}
function EditHotelRoomData({ hotelRoomData, hotelId }: ResponsiveAppBarProps) {
  const [open, setOpen] = useState(true);

  const handleClose = async () => {
    setOpen(false);
    newDashboardWindow(<ShowHotelDataOwner hotelId={hotelId}/>)
  };

  const handleDelete = async () => {
    setOpen(false);
    DeleteRoom(hotelRoomData.hotelRoomId)
  };

  const handleSave = async () => {
    setOpen(false);
    // newDashboardWindow(<ShowHotelDataOwner hotelId={hotelId}/>)
  };


  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit room</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Hotel Name"
            name="hotelName"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditHotelRoomData;