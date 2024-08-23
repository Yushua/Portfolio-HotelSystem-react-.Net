
import React from 'react';
import Vacancies from '../../UserPages/Vacancies';

interface ResponsiveAppBarProps {
  hotelId: string;
}
function HotelVacancies({ hotelId }: ResponsiveAppBarProps) {
  return (
    <>
      frist option to make Vacancies
      below all the vacancies from THAT Hotel
    </>
  );
}

export default HotelVacancies;