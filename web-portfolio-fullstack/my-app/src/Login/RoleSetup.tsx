import React, { useEffect, useState } from 'react';
import { newWindow } from '../App';
import UserProfile from '../MainBrowser/ProfileInformation/UserProfile';
import MainBrowser from '../MainBrowser/MainBrowser';
import getUserFavorites from '../MainBrowser/Functions/getuserFunctions';
import CreateHotelPage from '../MainBrowser/Pages/HotelOwnerPages/CreateHotelPage';
import CreateRoomPage from '../MainBrowser/Pages/HotelOwnerPages/CreateRoomPage';
import HotelVacancies from '../MainBrowser/Pages/HotelOwnerPages/HotelVacancies';
import SetupNewEmployeeVacancy from '../MainBrowser/Pages/HotelOwnerPages/SetupNewEmployeeVacancy';
import ShowHotelDataOwner from '../MainBrowser/Pages/HotelOwnerPages/ShowHotelDataOwner';
import ShowHotelEmployees from '../MainBrowser/Pages/HotelOwnerPages/ShowHotelHotelEmployees';
import ShowRoomDataOwner from '../MainBrowser/Pages/HotelOwnerPages/ShowRoomDataOwner';
import SearchForRooms from '../MainBrowser/Pages/UserPages/SearchForRooms';
import ShowAllRooms from '../MainBrowser/Pages/UserPages/ShowAllRooms';
import Vacancies from '../MainBrowser/Pages/UserPages/Vacancies';

const WebPages: Array<[string, JSX.Element]> = [
  ['Profile', <UserProfile />],
  //owner
  ['Create Hotel', <CreateHotelPage/>],
  ['Create Room', <CreateRoomPage/>],
  ['HotelVacancies', <HotelVacancies/>],
  ['SetupNewEmployeeVacancies', <SetupNewEmployeeVacancy/>],
  ['ShowHotelDataOwner', <ShowHotelDataOwner/>],
  ['ShowHotelEmployees', <ShowHotelEmployees/>],
  ['ShowRoomDataOwner', <ShowRoomDataOwner/>],
  //User
  ['SearchForRooms', <SearchForRooms/>],
  ['ShowAllRooms', <ShowAllRooms/>],
  ['Vacancies', <Vacancies/>],
];

const filterWebPages = (pageNames: string[]): Array<[string, JSX.Element]> => {
  return WebPages.filter(([name, _]) => pageNames.includes(name));
};

//to do, add filter online.
export async function filterRoles(): Promise<Array<[string, JSX.Element]>> {
  //go to backend, and get the website you are owned, you get a string[]
  //use string to get the webpages filtered
  //return this filtered information
  return WebPages;
}

function RoleSetup(){
  const [FavoritesList, setFavoritesList] = useState<Array<[string, JSX.Element]>>([]);

  useEffect(() => {
    const getRolesOfUser = async () => {
      const webPagesUserArray: string[] = await getUserFavorites();
      setFavoritesList(filterWebPages(webPagesUserArray));
      console.log(webPagesUserArray.length)
      if (webPagesUserArray.length === 0){
        newWindow(<MainBrowser webPages={FavoritesList} />);
      }
    };
    getRolesOfUser();
  }, [FavoritesList]);

  useEffect(() => {
    if (FavoritesList.length > 0) {
      newWindow(<MainBrowser webPages={FavoritesList} />);
    }
  }, [FavoritesList]);

    return (
      <>
        loading Role setup
      </>
    );
  }
  
  export default RoleSetup;