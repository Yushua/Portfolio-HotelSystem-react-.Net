import { useEffect } from "react";

async function getOwnerHotelData(hotelID: string){

}

interface ResponsiveAppBarProps {
  hotelId: string;
}
function ShowHotelDataOwner({ hotelId }: ResponsiveAppBarProps) {

  const fetchOwnerHotels = async () => {
    await getOwnerHotelData(hotelId);
  }

  useEffect(() => {
    fetchOwnerHotels();
  }, []);

  return (
    <>

      shows all OCCUPIED rooms

      shows all UNNOCCUPIED ROOMS

      add room option

    </>
  );
}

export default ShowHotelDataOwner;