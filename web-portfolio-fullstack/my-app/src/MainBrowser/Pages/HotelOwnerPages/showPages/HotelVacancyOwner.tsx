
import { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import TextfieldComponent from '../../Components/TextfieldComponent';
import { newDashboardWindow } from '../../DashboardPage';
import EditVacancyData from '../../EditData/EditVacancyData';

interface ResponsiveAppBarProps {
  vacancyData?: any;
  vacancyid?: string;
  hotelId: string;
}

async function getVacancyDataHttp(vacancyid:string){
  try {
    const response = await fetch("http://localhost:3000/hotels/GetVacancyDays", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
      body: JSON.stringify({vacancyId: vacancyid}),
    });
    if (!response.ok) {
    }
    else {
      const data = await response.json();
      _setVacancyDataStored(data["VacancyData"])
      console.log(data)
    }
    return response;
  } catch (error: any) {
  }

}

var _setVacancyDataStored: React.Dispatch<React.SetStateAction<any>>

function HotelVacancyOwner({ vacancyData, vacancyid }: ResponsiveAppBarProps) {
  const [vacancyDataStored, setVacancyDataStored] = useState<any>([]);
  _setVacancyDataStored = setVacancyDataStored;
    useEffect(() => {
    if (vacancyid !== undefined){
      getVacancyDataHttp(vacancyid);
    } else {
      setVacancyDataStored(vacancyData);
    }
  }, [vacancyData, vacancyid]);
  return (
    <>
    <Grid container
      className='containerTabsData'
      spacing={3}
      >
        <Grid item xs={4}>
          <TextfieldComponent value={vacancyDataStored.jobName}/>
        </Grid>
        <Grid item xs={4}>
          <TextfieldComponent value={vacancyDataStored.jobTitle}/>
        </Grid>
        <Grid item xs={4}>
          <TextfieldComponent value={vacancyDataStored.jobPay}/>
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel control={<Checkbox
            defaultChecked
            checked={vacancyDataStored.filled}
            />} label="jobStatus" />
        </Grid>
        <Grid item xs={12}>
          <TextfieldComponent value={vacancyDataStored.jobDescription}/>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => newDashboardWindow(<EditVacancyData
              vacancyData={vacancyDataStored}
              />)}
          >edit</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default HotelVacancyOwner;