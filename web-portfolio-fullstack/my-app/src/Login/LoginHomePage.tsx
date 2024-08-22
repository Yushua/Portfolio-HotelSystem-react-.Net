import './Login.css';
import Button from '@mui/material/Button';
import { newWindow } from '../App';
import LoginHomePageImageComponent from './components/LoginImageComponent';
import LoginCreatePage from './LoginPage';

function LoginHomePage(){
    const handleClickLogin = async () => {
      await newWindow(<LoginCreatePage ActionName={"Login Account"}/>);
    };
    const handleClickCreateAccount = async () => {
      await newWindow(<LoginCreatePage ActionName={"Create Account"}/>);
    };
    return (
      <div >
        <div className="LoginPageImageBox">
          <LoginHomePageImageComponent newWindow={newWindow} LoginHomePage={LoginHomePage} />
        </div>
        <div className="LoginPageBox">
          <div className="buttonWrapper">
            <Button onClick={handleClickLogin} variant="contained">Login</Button>
          </div>
          <div className="buttonWrapper">
            <Button onClick={handleClickCreateAccount} variant="contained">Create Account</Button>
          </div>
          
        </div>
      </div>
    );
  }
  
  export default LoginHomePage;