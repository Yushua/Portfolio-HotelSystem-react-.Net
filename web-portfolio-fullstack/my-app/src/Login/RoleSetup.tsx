import React, { useEffect, useState } from 'react';
import { newWindow } from '../App';
import UserProfile from '../MainBrowser/Pages/UserPages/UserProfile';
import MainBrowser from '../MainBrowser/MainBrowser';
import CreateHotelPage from '../MainBrowser/Pages/HotelOwnerPages/CreateHotelPage';
import HotelVacancies from '../MainBrowser/Pages/HotelOwnerPages/HotelVacancies';
import SetupNewEmployeeVacancy from '../MainBrowser/Pages/HotelOwnerPages/SetupNewEmployeeVacancy';
import ShowHotelEmployees from '../MainBrowser/Pages/HotelOwnerPages/ShowHotelEmployees';
import ShowRoomDataOwner from '../MainBrowser/Pages/HotelOwnerPages/ShowRoomDataOwner';
import SearchForRooms from '../MainBrowser/Pages/UserPages/SearchForRooms';
import ShowAllRooms from '../MainBrowser/Pages/UserPages/ShowAllRooms';
import Vacancies from '../MainBrowser/Pages/UserPages/Vacancies';
import ShowAllOwnerHotels from '../MainBrowser/Pages/HotelOwnerPages/ShowAllOwnerHotels';

const WebPages: Array<[string, JSX.Element]> = [
  ['Profile', <UserProfile />],
  //owner
  ['Create Hotel', <CreateHotelPage/>],
  ['Hotel Owner', <ShowAllOwnerHotels/>],
  ['HotelVacancies', <HotelVacancies/>],
  ['Employee Vacancies', <SetupNewEmployeeVacancy/>],
  ['Employees', <ShowHotelEmployees/>],
  //User
  ['Rooms', <ShowAllRooms/>],
  ['Hotels', <ShowAllRooms/>],
  ['Vacancies', <Vacancies/>],
];

const filterWebPages = (pageNames: string[]): Array<[string, JSX.Element]> => {
  return WebPages.filter(([name, _]) => pageNames.includes(name));
};

//to do, add filter online.
export async function filterRoles(): Promise<Array<[string, JSX.Element]>> {
  //filter the webpages based on your role.
  //simple system. each role has the corresponding roles attached to it. make sure the name on the backend is there
  //then it goes through each of them, filters and adds to the list. then again. then you check here if its included.
  //it can happen multiple webs you can access, that is ok
  return WebPages;
}

function RoleSetup(){
  const [RoleWebList, setRoleWebList] = useState<Array<[string, JSX.Element]>>([]);
  const [FavoriteWebList, setFavoriteWebList] = useState<Array<[string, JSX.Element]>>([]);

  useEffect(() => {
    const getRolesOfUser = async () => {
      // const webPagesUserArray: string[] = await getUserWebpages();
      // setRoleWebList(filterWebPages(webPagesUserArray));
      // console.log(webPagesUserArray.length)

      // const webPagesUserFavArray: string[] = await getUserFavorites();
      // setFavoriteWebList(filterWebPages(webPagesUserFavArray));
      // if (webPagesUserArray.length === 0 && webPagesUserFavArray.length === 0){
      //   //for now add all webpages as info
      //   newWindow(<MainBrowser webPages={WebPages} favoritePages={WebPages}/>);
      // }
      newWindow(<MainBrowser webPages={WebPages} favoritePages={WebPages}/>);
    };
    getRolesOfUser();
  }, [RoleWebList, FavoriteWebList]);

    return (
      <>
        loading Role setup
      </>
    );
  }
  
  export default RoleSetup;