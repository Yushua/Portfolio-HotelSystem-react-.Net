import { newWindow } from "../../App";
import LoginHomePage from "../../Login/LoginHomePage";

  async function getUserWebpages(): Promise<string[]> {
    var Webpages:string[] = [];
    try {
      const response = await fetch("http://localhost:3000/user/GetAllUserWebpages", {
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
        Webpages = data["Webpages"]
      }
  
    } catch (error: any) {
    }
    return Webpages;
  }

  export default getUserWebpages;