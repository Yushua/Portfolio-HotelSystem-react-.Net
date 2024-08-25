
import { Button, Dialog, DialogActions, DialogTitle, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextfieldComponent from '../Components/TextfieldComponent';
import TextfieldComponentDescription from '../Components/TextfieldComponentDescription';

type FormStateString = {
  JobName: string;
  JobTitle: string;
  JobDescription: string;
  [key: string]: string; // This allows for dynamic form fields
};

type FormStateNumber = {
  JobPay: number;
};

type FormStateMessage = {
  JobName: string;
  JobTitle: string;
  JobDescription: string;
  JobPay: string;
  [key: string]: string; // This allows for dynamic form fields
};

export type FormBoolean = {
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

var _setFormErrors: React.Dispatch<React.SetStateAction<FormBoolean>>
var _setFormMessage: React.Dispatch<React.SetStateAction<FormStateMessage>>

async function getAllData(employeeId: string){
  try {
    const response = await fetch("http://localhost:3000/hotels/OwnerGetAllEmployeeJobINfoRelatedToOwner", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
      body: JSON.stringify({employeeId: employeeId}),
    });
    if (!response.ok) {
    }
    else {
      const data = await response.json();
      _setData(data["AllData"])
    }
    return response;
  } catch (error: any) {
  }
}

async function removeJob(jobId: string, employeeId: string){
  try {
    const response = await fetch("http://localhost:3000/hotels/OwnerRemoveJobFromEmployee", {
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
      body: JSON.stringify({jobId: jobId}),
    });
    if (!response.ok) {
    }
    else {
      await getAllData(employeeId)
      _setOpen(false);
    }
    return response;
  } catch (error: any) {
  }
}

async function resetErrorAndMessage(){
  _setFormMessage({
    JobName: "",
    JobTitle: "",
    JobDescription: "",
    JobPay: "",
  });

  _setFormErrors({
    JobName: false,
    JobTitle: false,
    JobDescription: false,
    JobPay: false,
  });
}
async function PatchJobData(
  employeeId: string,
  jobId: string,
  formStateString: FormStateString,
  formStateNumber: FormStateNumber){

    const credentials = {
      JobName: formStateString.JobName,
      JobTitle: formStateString.JobTitle,
      JobDescription: formStateString.JobDescription,
      JobPay: Number(formStateNumber.JobPay),
      jobId: jobId
    };
  
  await resetErrorAndMessage();
  try {
    const response = await fetch("http://localhost:3000/hotels/OwnerPatchJobFromEmployee", {
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
      await getAllData(employeeId);
      _setOpen(false);
    }
    return response;
  } catch (error: any) {
  }  
}

var _setData: React.Dispatch<React.SetStateAction<any>>
interface ResponsiveAppBarProps {
  employeeId: string;
}

var _setOpen: React.Dispatch<React.SetStateAction<boolean>>

/**
 * in here, you see all the jobs this employee has in relation to owner
 * @returns 
 */

function ShowHotelEmployeesFromBossJobs({ employeeId }: ResponsiveAppBarProps) {

  const [Data, setData] = useState<any[]>([]);
  _setData = setData;

  const fetchData = async () => {
    await getAllData(employeeId);
  }

  useEffect(() => {
    fetchData();
  }, [employeeId]);

  const [StoreJob, setStoreJob] = useState<any>([]);

  const handleonEditJob = async (job: any) => {
    setStoreJob(job);
    console.log(job);
    setFormStateString({
      JobName: job.jobName || '',
      JobTitle: job.jobTitle || '',
      JobDescription: job.jobDescription || '',
    });
  
    setFormStateNumber({
      JobPay: job.jobPay as number || 0,
    });
  
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    setStoreJob([]);
  };

  const handleonRemoveJob = async (jobId: string) => {
    await removeJob(jobId, employeeId);
  };

  const [open, setOpen] = useState(false);
  _setOpen = setOpen;

  const [formErrors, setFormErrors] = React.useState<FormBoolean>({});
  _setFormErrors = setFormErrors;

  const [formMessage, setFormMessage] = React.useState<FormStateMessage>({
    JobName: "",
    JobTitle: "",
    JobDescription: "",
    JobPay: "",
  });

  _setFormMessage = setFormMessage;

  const [formStateString, setFormStateString] = React.useState<FormStateString>({
    JobName: "",
    JobTitle: "",
    JobDescription: "",
    JobPay: ""
  });
  const handleOnChangeValueString = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormStateString({
      ...formStateString,
      [name]: value,
    });
  };

  const [formStateNumber, setFormStateNumber] = React.useState<FormStateNumber>({
    JobPay: 0,
  });

  const handleOnChangeValueNumber = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const numericValue = value === "" ? 0 : parseFloat(value);
    if (!isNaN(numericValue)) {
      setFormStateNumber((prevState) => ({
        ...prevState,
        [name]: numericValue,
      }));
    }
  };

  const handleSave = async () => {
    await PatchJobData(employeeId, StoreJob.jobId, formStateString, formStateNumber);
  };

  return (
    <>
      <Grid container className='containerInfo' spacing={6}>
      {Data.map((info) => (
        <Grid item xs={6} key={info.infoId} className='containerInfoItems' onClick={() => handleonEditJob(info)}>
          <TextfieldComponent value={info.jobName || ''} helpertext={"Job name"}/>
          <TextfieldComponent value={info.jobTitle || ''} helpertext={"Job Title"}/>
          <TextfieldComponent value={info.jobPay || ''} helpertext={"Job Pay"}/>
          <TextfieldComponentDescription value={info.jobDescription|| ''} size={4}/>
      </Grid>
      ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogTitle>Edit Job</DialogTitle>
        <Grid container className='dialogContainer' spacing={6} >
          <Grid item xs={4}>
            <TextField
              required
              label="Job Name"
              className="gridTextfieldInput"
              fullWidth
              name="JobName"
              style={{ marginTop: 10 }}
              value={formStateString.JobName}
              onChange={handleOnChangeValueString}
              error={!!formErrors.JobName}
              helperText={formMessage.JobName}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Job Title"
              className="gridTextfieldInput"
              fullWidth
              name="JobTitle"
              style={{ marginTop: 10 }}
              value={formStateString.JobTitle}
              onChange={handleOnChangeValueString}
              error={!!formErrors.JobTitle}
              helperText={formMessage.JobTitle}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Job Pay"
              className="gridTextfieldInput"
              fullWidth
              name="JobPay"
              style={{ marginTop: 10 }}
              value={formStateNumber.JobPay}
              onChange={handleOnChangeValueNumber}
              error={!!formErrors.JobPay}
              helperText={formMessage.JobPay}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Job Description"
              className="gridTextfieldDescription"
              fullWidth
              name="JobDescription"
              multiline
              rows={4}
              style={{ marginTop: 10 }}
              value={formStateString.JobDescription}
              onChange={handleOnChangeValueString}
              error={!!formErrors.JobDescription}
              helperText={formMessage.JobDescription}
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
          <Button onClick={() => handleonRemoveJob(StoreJob.jobId)} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ShowHotelEmployeesFromBossJobs;