
import React from 'react';

interface ResponsiveAppBarProps {
  hotelId: string;
  hotelName: string;
  hotelDescription: string;
}
function EditHotelData({ hotelId, hotelName, hotelDescription }: ResponsiveAppBarProps) {
  return (
    <>
      edit the hotel here and Patch
    </>
  );
}

export default EditHotelData;