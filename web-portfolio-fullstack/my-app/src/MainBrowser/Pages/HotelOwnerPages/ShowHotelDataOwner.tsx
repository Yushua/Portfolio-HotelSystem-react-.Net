import { Grid, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import ShowHotelEmployees from "./HotelDataOverTabs/ShowHotelEmployees";
import ShowHotelDataOwnerTabs from "./ShowHotelDataOwnerTabs";
import TextfieldComponent from "../Components/TextfieldComponent";
import TextfieldComponentDescription from "../Components/TextfieldComponentDescription";

async function getOwnerHotelData(hotelID: string){
  const credentials = {
    HotelId: hotelID,
  };
  try {
    const response = await fetch("http://localhost:3000/hotels/GetHotelData", {
      method: "Post",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      // if (response.status === 404){
      //   const errorData = await response.json();
      // }
    } else {
      const data = await response.json();
      _setHotel(data["HotelData"])
    }
    return response;
  } catch (error: any) {
    console.log(error)
  }
}

var _setHotel: React.Dispatch<React.SetStateAction<any>>

interface ResponsiveAppBarProps {
  hotelId: string;
}
function ShowHotelDataOwner({ hotelId }: ResponsiveAppBarProps) {

  const [hotel, setHotel] = useState<any>([]);
  _setHotel = setHotel;

  const fetchOwnerHotels = useCallback(async () => {
    await getOwnerHotelData(hotelId);
  }, [hotelId]);

  useEffect(() => {
    fetchOwnerHotels();
  }, [fetchOwnerHotels]);

  return (
    <>
    <Grid container className='container' spacing={6}>
      <Grid item xs={4}>
        <TextfieldComponent value={hotel.hotelName}/>
      </Grid>
      <Grid item xs={4}>
        <TextfieldComponent value={hotel.hotelId}/>
      </Grid>
      <Grid item xs={4}>
        <TextfieldComponent value={hotel.hotelOwner}/>
      </Grid>
      <Grid item xs={12}>
        <TextfieldComponentDescription value={hotel.hotelDescription} size={4}/>
      </Grid>
    <ShowHotelDataOwnerTabs hotelId={hotelId}/>
    </Grid>
    </>
  );
}

export default ShowHotelDataOwner;