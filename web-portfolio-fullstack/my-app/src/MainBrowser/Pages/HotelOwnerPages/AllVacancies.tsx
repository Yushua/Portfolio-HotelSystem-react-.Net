import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { newHotelDataWindow } from "./ShowHotelDataOwnerTabs";
import HotelVacancyOwner from "./showPages/HotelVacancyOwner";
import TextfieldComponent from "../Components/TextfieldComponent";
import TextfieldComponentDescription from "../Components/TextfieldComponentDescription";

async function getAllVacanciesData(){
  try {
    const response = await fetch("http://localhost:3000/hotels/GetAllVacanciesUser", {
      method: "POST",
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

  return (
    <>
      {vacanciesDataStored.map((vacancy) => (
        <Grid container
        className='containerTabs'
        spacing={3}
        // applyforJob(see more info)
        // onClick={() => newHotelDataWindow(
        // <HotelVacancyOwner
        // hotelId={hotelId}
        // vacancyData={vacancy}
        // />)}
        >
          <Grid item xs={4}>
            <TextfieldComponent value={vacancy.jobName}/>
          </Grid>
          <Grid item xs={4}>
            <TextfieldComponent value={vacancy.jobTitle}/>
          </Grid>
          <Grid item xs={4}>
            <TextfieldComponent value={vacancy.jobPay}/>
          </Grid>
          <Grid item xs={12}>
            <TextfieldComponentDescription value={vacancy.jobDescription} size={4}/>
          </Grid>
        </Grid>
    ))}
      
    </>
  );
}

export default AllVacancies;