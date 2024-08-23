
import React, { useState } from 'react';
import ShowOccupiedHotelRoomsOwner from './HotelDataOverTabs/ShowOccupiedHotelRoomsOwner';
import ShowHotelEmployees from './HotelDataOverTabs/ShowHotelEmployees';
import HotelVacancies from './HotelDataOverTabs/HotelVacancies';
import ShowVacantHotelRoomsOwner from './HotelDataOverTabs/ShowVacantHotelRoomsOwner';
import ShowAllOwnerRoomsFromHotel from './HotelDataOverTabs/ShowAllOwnerRoomsFromHotel';
import { Button, Grid } from '@mui/material';
import CreateRoomPage from './HotelDataOverTabs/CreateRoomPage';

export async function newHotelDataWindow(newWindow:JSX.Element) {
  if (!!_setWindowHotelData && !document.getElementById("ErrorPage"))
    _setWindowHotelData(newWindow)
}

var _setWindowHotelData: React.Dispatch<React.SetStateAction<JSX.Element>> | null = null

interface ResponsiveAppBarProps {
  hotelId: string;
}

function ShowHotelDataOwnerTabs({ hotelId }: ResponsiveAppBarProps) {
  
  const WebPages: Array<[string, JSX.Element]> = [
    ['Vacant', <ShowVacantHotelRoomsOwner hotelId={hotelId}/>],
    ['Occupied', <ShowOccupiedHotelRoomsOwner hotelId={hotelId}/>],
    ['Create', <CreateRoomPage hotelId={hotelId}/>],
    ['Employees', <ShowHotelEmployees hotelId={hotelId}/>],
    ['Vacancies', <HotelVacancies hotelId={hotelId}/>],
    ['Rooms', <ShowAllOwnerRoomsFromHotel hotelId={hotelId}/>],
  ];
  const [WindowDashboard, setWindowHotelData] = useState<JSX.Element>(<ShowAllOwnerRoomsFromHotel hotelId={hotelId}/>)
  _setWindowHotelData = setWindowHotelData

  return (
    <>
    {WebPages.map((Links) => (
      <Grid item xs={2} key={Links[0]} 
      style={{
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center'}}>
          
        <Button
        fullWidth
        onClick={() => newHotelDataWindow(Links[1])}
        >
        {Links[0]}
        </Button>
      </Grid>
    ))}
    <Grid item xs={12}>
      {WindowDashboard}
    </Grid>
    </>
  );
}

export default ShowHotelDataOwnerTabs;