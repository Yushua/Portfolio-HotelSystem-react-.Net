
import React from 'react';
import { FormBoolean } from '../HotelDataOverTabs/CreateFunctions';
import { newHotelDataWindow } from '../ShowHotelDataOwnerTabs';
import { Button, Grid, TextField } from '@mui/material';
import HotelVacancyOwner from '../showPages/HotelVacancyOwner';
import HotelVacancies from '../showPages/HotelVacancies';

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

async function createNewVacancyHttp(
  hotelId: string,
  formStateString: FormStateString,
  formStateNumber: FormStateNumber,
  ){
    const credentials = {
      HotelId: hotelId,
      jobName: formStateString.jobName,
      jobDescription: formStateString.jobDescription,
      jobTitle: formStateString.jobTitle,
      jobPay: Number(formStateNumber.jobPay),
    };
    await resetErrorAndMessage();
    console.log("creating vacancy")
    try {
      const response = await fetch("http://localhost:3000/hotels/CreateVacancy", {
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
        newHotelDataWindow(<HotelVacancyOwner
          hotelId={hotelId}
          vacancyData={data["vacancyData"]}
          locationReturn={<HotelVacancies hotelId={hotelId}/>}/>)
      }
      return response;
    } catch (error: any) {
      console.log(error)
    } 
}

interface ResponsiveAppBarProps {
  hotelId: string;
}

var _setFormErrors: React.Dispatch<React.SetStateAction<FormBoolean>>
var _setFormMessage: React.Dispatch<React.SetStateAction<FormStateMessage>>

/**
 * create vacacancies.
 * upon creating, return to
 * <HotelVacancies hotelId={hotelId}/>
 * @param param0 
 * @returns 
 */
function HotelVacanciesCreate({ hotelId }: ResponsiveAppBarProps) {
  const [formErrors, setFormErrors] = React.useState<FormBoolean>({});
  _setFormErrors = setFormErrors;

  const [formMessage, setFormMessage] = React.useState<FormStateMessage>({
    jobName: "",
    jobDescription: "",
    jobTitle: "",
    jobPay:"",
  });
  _setFormMessage = setFormMessage;

  const [formStateString, setFormStateString] = React.useState<FormStateString>({
    jobName: "",
    jobDescription: "",
    jobTitle: "",
  });
  const handleOnChangeValueString = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormStateString({
      ...formStateString,
      [name]: value,
    });
  };
  const [formStateNumber, setFormStateNumber] = React.useState<FormStateNumber>({
    jobPay: 0,
  });

  const handleOnChangeValueNumber = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
        setFormStateNumber((prevState) => ({
            ...prevState,
            [name]: value === "" ? 0 : parseFloat(value),
        }));
    } else {
        validateFieldErrors(name);
        validateFieldmessage(name, "Only use numbers");
    }
};

  const handleSubmit = async () => {
    await createNewVacancyHttp(hotelId, formStateString, formStateNumber);
  }

  return (
    <>
      <Grid container className='container' spacing={6}>
        <Grid item xs={4}>
          <TextField
            required
            label="Job Name"
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
            label="Job Title"
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
            label="Job Pay"
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
            label="Job Description"
            className="gridTextfieldDescription"
            fullWidth
            name="jobDescription"
            multiline
            rows={4}
            style={{ marginTop: 10 }}
            value={formStateString.jobDescription}
            onChange={handleOnChangeValueString}
            error={!!formErrors.jobDescription}
            helperText={formMessage.jobDescription}
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

export default HotelVacanciesCreate;