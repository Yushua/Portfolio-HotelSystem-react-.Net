import { useEffect} from 'react';
import { newWindow } from '../App';
import { makeHttpRequest } from '../LoginFunctions/HTTP-Functions';
import ErrorPage from '../ErrorPages/Template';
import LoginHomePage from './LoginHomePage';
import RoleSetup from './RoleSetup';

function RefreshPageCheck(){
    useEffect(() => {
        const makeJwtRequest = async () => {
          if (!localStorage.getItem('jwtToken')){
            localStorage.removeItem('jwtToken');
            newWindow(<LoginHomePage/>)
          }
          try {
            const response = await makeHttpRequest("auth/jwtCheck", "POST", "", {Accept: 'application/json'});       
            if (response) {        
              if (response.status === 201) {
                newWindow(<RoleSetup/>)
              } else {
                newWindow(<ErrorPage errorMessage="Page not found" errorCode={501} />);
              }
            } else {
              newWindow(<LoginHomePage />);
            }
          } catch (error: any) {
            if (error.message && error.message.includes("status: 401")) {
              newWindow(<LoginHomePage/>);
            } else {
              newWindow(<ErrorPage errorMessage="Page not found" errorCode={501} />);
            }
        
          }
        };
        
        makeJwtRequest();
      }, []);
    return (
      <div>
      </div>
    );
  }
  
  export default RefreshPageCheck;