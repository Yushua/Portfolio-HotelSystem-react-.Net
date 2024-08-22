
import React from 'react';

interface ResponsiveAppBarProps {
  hotelId: string;
}
function HotelVacancies({ hotelId }: ResponsiveAppBarProps) {
  return (
    <>
      see the vacancies you have opened, once clicked you get the data from that vacancie.

      the option to edit the info

      the people applying below, licking on them shows their EmployeePage
    </>
  );
}

export default HotelVacancies;