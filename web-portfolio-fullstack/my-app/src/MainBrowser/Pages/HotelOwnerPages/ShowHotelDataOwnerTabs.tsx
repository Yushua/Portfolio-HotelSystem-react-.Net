
import React, { useEffect, useState } from 'react';
import ShowHotelEmployees from './HotelDataOverTabs/ShowHotelEmployees';
import HotelVacancies from './HotelDataOverTabs/HotelVacancies';
import ShowAllOwnerRoomsFromHotel from './HotelDataOverTabs/ShowAllOwnerRoomsFromHotel';
import { Button, Grid } from '@mui/material';
import CreateRoomPage from './HotelDataOverTabs/CreateRoomPage';
import ShowRoomDataOwner from './HotelDataOverTabs/ShowRoomDataOwner';

export async function newHotelDataWindow(newWindow:JSX.Element) {
  if (!!_setWindowHotelData && !document.getElementById("ErrorPage"))
    _setWindowHotelData(newWindow)
}

var _setWindowHotelData: React.Dispatch<React.SetStateAction<JSX.Element>> | null = null

interface ResponsiveAppBarProps {
  hotelId: string;
  pageName?: string;
}

function ShowHotelDataOwnerTabs({ hotelId, pageName }: ResponsiveAppBarProps) {
  
  const WebPages: Array<[string, JSX.Element]> = [
    ['Rooms', <ShowAllOwnerRoomsFromHotel hotelId={hotelId}/>],
    ['Create', <CreateRoomPage hotelId={hotelId}/>],
    ['Employees', <ShowHotelEmployees hotelId={hotelId}/>],
    ['Vacancies', <HotelVacancies hotelId={hotelId}/>],
    ['Room Data', <ShowRoomDataOwner hotelData={[]} hotelId={hotelId}/>],
  ];
  const [WindowDashboard, setWindowHotelData] = useState<JSX.Element>(<ShowAllOwnerRoomsFromHotel hotelId={hotelId}/>)
  _setWindowHotelData = setWindowHotelData

  // useEffect(() => {
  //   if (pageName !== undefined){
  //     const page = WebPages.find(([label]) => label === pageName);
  //     newHotelDataWindow()
  //   }
  // }, [pageName]);

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
    <Grid item xs={12} className='tabContainer'>
      {WindowDashboard}
    </Grid>
    </>
  );
}

export default ShowHotelDataOwnerTabs;