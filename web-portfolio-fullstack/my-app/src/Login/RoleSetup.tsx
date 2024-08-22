import React, { useEffect, useState } from 'react';
import { newWindow } from '../App';
import UserProfile from '../MainBrowser/ProfileInformation/UserProfile';
import HotelOwnerPage from '../MainBrowser/Pages/HoterlOwner';
import MarketPlaceBuyer from '../MainBrowser/Pages/MarketPlaceBuyer';
import MarketPlaceSellerPage from '../MainBrowser/Pages/MarketPlaceSellerPage';
import HotelBuyerPage from '../MainBrowser/Pages/HoterlBuyerPage';
import MainBrowser from '../MainBrowser/MainBrowser';
import getUserFavorites from '../MainBrowser/Functions/getuserFunctions';

const WebPages: Array<[string, JSX.Element]> = [
  ['Profile', <UserProfile />],
  ['Hotels', <HotelBuyerPage />],
  ['Hotel Owner', <HotelOwnerPage />],
  ['Marketplace', <MarketPlaceBuyer />],
  ['Marketplace Owner', <MarketPlaceSellerPage />],
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