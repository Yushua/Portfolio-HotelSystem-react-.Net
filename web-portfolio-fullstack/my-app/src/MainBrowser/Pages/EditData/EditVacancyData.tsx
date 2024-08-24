
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { newDashboardWindow } from '../DashboardPage';
import ShowHotelDataOwner from '../HotelOwnerPages/ShowHotelDataOwner';
import { FormBoolean } from './EditHotelRoomData';
import HotelVacancies from '../HotelOwnerPages/showPages/HotelVacancies';
import { newHotelDataWindow } from '../HotelOwnerPages/ShowHotelDataOwnerTabs';

type FormStateString = {
  jobName: string;
  jobDescription: string;
  jobTitle: string;
  [key: string]: string;
};

type FormStateNumber = {
  jobPay: number;
};

type FormStateMessage = {
  jobName: string;
  jobDescription: string;
  jobTitle: string;
  jobPay: string;
  [key: string]: string;
};

type FormStateBoolean = {
  filled: boolean,
  [key: string]: boolean; // Allows additional properties with boolean values
};

async function resetErrorAndMessage(){
  _setFormMessage({
    jobName: "",
    jobDescription: "",
    jobTitle: "",
    jobPay: "",
  });

  _setFormErrors({
    jobName: false,
    jobDescription: false,
    jobTitle: false,
    jobPay: false,
  });
}

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


var _setFormErrors: React.Dispatch<React.SetStateAction<FormBoolean>>
var _setFormMessage: React.Dispatch<React.SetStateAction<FormStateMessage>>

async function PatchVacancyData(
  vacancyId: string,
  hotelId: string,
  formStateString: FormStateString,
  formStateNumber: FormStateNumber){
    const credentials = {
      VacancyId: vacancyId, 
      jobDescription: formStateString.jobDescription,
      jobName: formStateString.jobName,
      jobPay: formStateNumber.jobPay,
    };
  try {
    const response = await fetch("http://localhost:3000/hotels/PatchHotelVacancyDataOwner", {
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
    }
    else {
      // _setOpen(false);
      // newHotelDataWindow(<HotelVacancies hotelId={hotelId}/>)
    }
    return response;
  } catch (error: any) {
  }  
}

async function DeleteRoom(roomId: string){
///delete room
}

var _setOpen: React.Dispatch<React.SetStateAction<boolean>>

interface ResponsiveAppBarProps {
  vacancyData: any;
  hotelId: string;
}

function EditVacancyData({ vacancyData, hotelId }: ResponsiveAppBarProps) {

  const [open, setOpen] = useState(true);
  _setOpen = setOpen;

  const handleClose = async () => {
    setOpen(false);
    newHotelDataWindow(<HotelVacancies hotelId={hotelId}/>)
  };

  const [formErrors, setFormErrors] = React.useState<FormBoolean>({});
  _setFormErrors = setFormErrors;

  const [formMessage, setFormMessage] = React.useState<FormStateMessage>({
    jobName: "",
    jobDescription: "",
    jobTitle: "",
    jobPay: "",
  });

  _setFormMessage = setFormMessage;
  const [formStateString, setFormStateString] = React.useState<FormStateString>({
    jobName: vacancyData.jobName,
    jobDescription: vacancyData.jobDescription,
    jobTitle: vacancyData.jobTitle,
  });

  const handleOnChangeValueString = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormStateString({
      ...formStateString,
      [name]: value,
    });
  };

  const [formStateNumber, setFormStateNumber] = React.useState<FormStateNumber>({
    jobPay: vacancyData.jobPay,
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

  const handleDelete = async () => {
    setOpen(false);
    // DeleteRoom(hotelRoomData.hotelRoomId)
  };

  const handleSave = async () => {
    await PatchVacancyData(vacancyData.VacancyId, hotelId ,formStateString, formStateNumber);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogTitle>Edit vacancy</DialogTitle>
        <Grid container className='dialogContainer' spacing={6} >
          <Grid item xs={4}>
            <TextField
              required
              label="Vacancy Name"
              className="gridTextfieldInput"
              fullWidth
              name="jobName"
              style={{ marginTop: 10 }}
              value={formStateString.jobName}
              onChange={handleOnChangeValueString}
              error={!!formErrors.jobName}
              helperText={formMessage.jobName}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Vacancy Title"
              className="gridTextfieldInput"
              fullWidth
              name="jobTitle"
              style={{ marginTop: 10 }}
              value={formStateString.jobTitle}
              onChange={handleOnChangeValueString}
              error={!!formErrors.jobTitle}
              helperText={formMessage.jobTitle}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Vacancy Pay"
              className="gridTextfieldInput"
              fullWidth
              name="jobPay"
              style={{ marginTop: 10 }}
              value={formStateNumber.jobPay}
              onChange={handleOnChangeValueNumber}
              error={!!formErrors.jobPay}
              helperText={formMessage.jobPay}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Hotel Description"
              className="gridTextfieldDescription"
              fullWidth
              name="Job Description"
              multiline
              rows={4}
              style={{ marginTop: 10 }}
              value={formStateString.jobDescription}
              onChange={handleOnChangeValueString}
              error={!!formErrors.jobDescription}
              helperText={formMessage.jobDescription}
            />
            </Grid>
        </Grid>
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

export default EditVacancyData;