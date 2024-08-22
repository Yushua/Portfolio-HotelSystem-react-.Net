import { Box, Grid } from '@mui/material';
import './Dashboard.css';
import React from 'react';

interface ResponsiveAppBarProps {
  hotelId: string;
}
function ShowAllOnwerRoomsFromHotel({ hotelId }: ResponsiveAppBarProps) {
  return (
    <>
      show all hotelrooms from that Hotel
    </>
  );
}

export default ShowAllOnwerRoomsFromHotel;