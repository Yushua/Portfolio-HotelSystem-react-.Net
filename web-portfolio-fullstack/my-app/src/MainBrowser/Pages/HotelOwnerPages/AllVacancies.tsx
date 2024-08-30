import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import TextfieldComponent from "../Components/TextfieldComponent";
import TextfieldComponentDescription from "../Components/TextfieldComponentDescription";


async function getAllVacanciesData(){
  try {
    const response = await fetch("http://localhost:3000/hotels/GetAllVacanciesUser", {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
    });
    if (!response.ok) {
      //handleError
    }
    else {
      const data = await response.json();
      _setVacanciesDataStored(data["vacanciesData"])
      console.log(data["vacanciesData"])
    }
    return response;
  } catch (error: any) {
    console.log(error)
  }  
}

async function ApplyToVacancy(VacancyId: string){
  try {
    const response = await fetch("http://localhost:3000/hotels/ApplyToVacancy", {
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
      body: JSON.stringify({vacancyId: VacancyId}),
    });
    if (!response.ok) {
    }
    else {
      getAllVacanciesData();
    }
    return response;
  } catch (error: any) {
    console.log(error)
  }  
}

var _setVacanciesDataStored: React.Dispatch<React.SetStateAction<any[]>>

function AllVacancies() {
  const [vacanciesDataStored, setVacanciesDataStored] = useState<any[]>([]);
  _setVacanciesDataStored = setVacanciesDataStored;


  useEffect(() => {
    getAllVacanciesData();
  }, []);

  const handleApply = async (VacancyId: string) => {
    await ApplyToVacancy(VacancyId);
  };
  return (
    <>
      {vacanciesDataStored.map((vacancy) => (
        <Grid container
        className='containerTabs'
        spacing={3}
        key={vacancy.id}
        >
          <Grid item xs={6}>
            <TextfieldComponent value={vacancy.hotelName} helpertext={"Hotel Name"}/>
          </Grid>
          <Grid item xs={6}>
            <TextfieldComponent value={vacancy.hotelOwner} helpertext={"Hotel Owner"}/>
          </Grid>
          <Grid item xs={4}>
            <TextfieldComponent value={vacancy.jobName} helpertext={"Job Name"}/>
          </Grid>
          <Grid item xs={4}>
            <TextfieldComponent value={vacancy.jobTitle} helpertext={"Job Title"}/>
          </Grid>
          <Grid item xs={4}>
            <TextfieldComponent value={vacancy.jobPay} helpertext={"AMount Rooms"}/>
          </Grid>
          <Grid item xs={12}>
            <TextfieldComponentDescription value={vacancy.jobDescription} size={4}/>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => handleApply(vacancy.VacancyId)} variant="contained" color="primary">
              Apply
            </Button>
          </Grid>
        </Grid>
    ))}
      
    </>
  );
}

export default AllVacancies;