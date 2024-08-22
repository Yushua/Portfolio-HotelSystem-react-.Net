import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import './AppBarPage.css'
import UserProfile from './ProfileInformation/UserProfile';
import { newWindow } from '../App';
import LoginHomePage from '../Login/LoginHomePage';
import { newBrowserWindow } from './MainBrowser';
import DashboardPage from './Pages/DashboardPage';

export const addPage = (pageName: string, pageElement: JSX.Element) => {
  //this will later be done in the backend
  _setPagesUser(prevPages => [...prevPages, [pageName, pageElement]]);
};

export const removePage = (pageName: string) => {
  _setPagesUser(prevPages => prevPages.filter(([name, _]) => name !== pageName));
};

const settings = [['Profile', <UserProfile/>], ['Logout', <></>]];
var _setPagesUser: React.Dispatch<React.SetStateAction<Array<[string, JSX.Element]>>> = () => {};

type WebPagesProp = Array<[string, JSX.Element]>;
interface ResponsiveAppBarProps {
  webPages: WebPagesProp;
}

function ResponsiveAppBar({ webPages }: ResponsiveAppBarProps){
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [pagesUser, setPagesUser] = React.useState<Array<[string, JSX.Element]>>([]);

  _setPagesUser = setPagesUser;

  React.useEffect(() => {
    const setupAppBar = async () => {
      setPagesUser(webPages);
    }
    setupAppBar();
  }, [webPages]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickDashboard = () => {
    newBrowserWindow(<DashboardPage />);
  }

  const handleonClickProfile = (index: number) => {
    return () => {
      if (settings[index][0] === "Profile") {
        newBrowserWindow(<UserProfile/>);
      } else if (settings[index][0] === "Logout") {
        newWindow(<LoginHomePage />);
      }
    };
  };

  const handleonClickMenu= (component: JSX.Element) => {
    newBrowserWindow(component);
  };

  return (
    <AppBar >
      <Container style={{ maxWidth: '100%' }}>
        <Toolbar disableGutters>
          <AdbIcon className="adb-icon" />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            className='logo'
            onClick={handleClickDashboard}
            sx={{
              fontFamily: 'monospace',
            }}
          >
            Portfolio
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '3rem', }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleonClickProfile(index)}>
                  <Typography textAlign="center">{setting[0]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, paddingLeft: "2rem" }}>
            {pagesUser.map((page, index) => (
              <Button
                key={index}
                onClick={() => handleonClickMenu(page[1])}
                className='PageButton'
              >
                {page[0]}
              </Button>
            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
