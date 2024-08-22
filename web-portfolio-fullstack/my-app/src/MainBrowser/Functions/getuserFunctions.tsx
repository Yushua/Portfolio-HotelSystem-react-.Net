import { newWindow } from "../../App";
import LoginHomePage from "../../Login/LoginHomePage";

async function getUserFavorites(): Promise<string[]> {
    var favorites:string[] = [];
    try {
      const response = await fetch("http://localhost:3000/user/GetAllUserFavorites", {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
        },
      });
      if (!response.ok) {
        localStorage.removeItem('jwtToken');
        newWindow(<LoginHomePage/>)
      } else {
        const data = await response.json();
        favorites = data["favorites"]
      }
  
    } catch (error: any) {
    }
    return favorites;
  }

  export default getUserFavorites;