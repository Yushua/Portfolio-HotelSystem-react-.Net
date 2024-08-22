import { Grid, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import ShowHotelEmployees from "./ShowHotelEmployees";
import ShowHotelDataOwnerTabs from "./ShowHotelDataOwnerTabs";

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
        <TextField
          label={hotel.hotelName}
          className="gridTextfieldInput"
          fullWidth
          style={{ marginTop: 10 }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label={hotel.hotelId}
          className="gridTextfieldInput"
          fullWidth
          style={{ marginTop: 10 }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label={hotel.hotelOwner}
          className="gridTextfieldInput"
          fullWidth
          style={{ marginTop: 10 }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label={hotel.hotelDescription}
          className="gridTextfieldInput"
          fullWidth
          rows={4}
          style={{ marginTop: 10 }}
        />
      </Grid>
    </Grid>
    <ShowHotelDataOwnerTabs/>
    </>
  );
}

export default ShowHotelDataOwner;