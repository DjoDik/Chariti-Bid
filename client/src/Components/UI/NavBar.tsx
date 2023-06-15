import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  Divider,
  ClickAwayListener,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { logoutThunk, checkUserThunk } from '../Redux/slice/userSlice';
import bg1 from '/img/bg1.jpg';
import bg2 from '/img/bg2.jpg';
import bg3 from '/img/bg3.jpg';
import bg4 from '/img/bg4.jpg';
import '../../css/Avatar.css';
import { setAvatar } from '../Redux/slice/avatarSlice';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { CSSTransition } from 'react-transition-group';
import { Col, Row } from 'reactstrap';
import SideBarCategory from './sideBarCategory';
import LeftSideMenu from '../LK/UI/LeftSideMenu';

export default function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);
  const avatar = useAppSelector((store) => store.avatar);

  const location = useLocation();

  useEffect(() => {
    dispatch(checkUserThunk());
  }, []);

  useEffect(() => {
    if (user.id) {
      dispatch(setAvatar(`http://localhost:3001/${user.avatar}`));
    }
  }, [user]);

  const logoutHandler = (): void => {
    dispatch(logoutThunk());
  };

  const [bgImages] = useState([bg1, bg2, bg3, bg4]);
  const [currentBgImageIndex, setCurrentBgImageIndex] = useState(0);
  const currentBgImage = bgImages[currentBgImageIndex];
  const [isImageLoaded, setImageLoaded] = useState(false);
  const userMenuRef = useRef(null);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const changeBackgroundImage = () => {
    setImageLoaded(false);
    setTimeout(() => {
      setCurrentBgImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
      setImageLoaded(true);
    }, 200); // Delay before changing and displaying the new background image (in milliseconds)
  };

  useEffect(() => {
    const intervalId = setInterval(changeBackgroundImage, 5000); // Interval in milliseconds for changing the background image

    return () => {
      clearInterval(intervalId); // Clear the interval on component unmount
    };
  }, []);

  const handleAvatarClick = () => {
    setUserMenuOpen((prevValue) => !prevValue);
  };

  const handleClickAway = () => {
    setUserMenuOpen(false);
  };

  let userContent = null;

  if (user.status === true) {
    userContent = (
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box sx={{ position: 'relative' }}>
          <Button
            onClick={handleAvatarClick}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 'auto' }}
          >
            <Avatar
              alt="User Avatar"
              src={avatar}
              sx={{
                width: 60,
                height: 60,
                transition: 'all 0.3s',
                '&:hover': {
                  width: 70,
                  height: 70,
                },
              }}
            />
          </Button>

          {isUserMenuOpen && (
            <Box
              ref={userMenuRef}
              sx={{
                display: 'flex',
                position: 'absolute',
                right: 0,
                top: '70px',
                zIndex: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                mt: 1,
                width: '300px',
                height: '400px',
                borderRadius: '10px',
              }}
            >
              {' '}
              <List component="nav">
                <Avatar
                  alt="User Avatar"
                  src={avatar}
                  sx={{
                    width: 160,
                    height: 160,
                   marginLeft: 10, 
                  }}
                />
                <ListItem disablePadding style={{ color: 'black', marginLeft: '80px' }}>
                  <LeftSideMenu />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/userprofile"
                    sx={{ color: 'black', '&:hover': { color: 'black' } , marginLeft: 10}}
                  >
                    Настройки
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={logoutHandler}
                    sx={{ color: 'black', '&:hover': { color: '#B51718' }, marginLeft: 10,}}
                  >
                    Выход
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          )}
        </Box>
      </ClickAwayListener>
    );
  } else {
    userContent = (
      <>
        <Button
          component={Link}
          to="/signup"
          style={{ color: '#B51718', '&:hover': { color: '#FFF' } }}
        >
          Регистрация
        </Button>
        <Button
          component={Link}
          to="/login"
          style={{ color: '#B51718', '&:hover': { color: '#FFF' } }}
        >
          Вход
        </Button>
      </>
    );
  }

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', boxShadow: 'none' }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }} component={Link} to="/">
              <Button type="button" style={{ height: '40px' }}>
                <img style={{ height: '50px', borderRadius: '10px' }} src="/logo.png" alt="#" />
              </Button>
              <Typography
                variant="h6"
                component="div"
                sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#B51718' }}
              ></Typography>
            </Box>
          </Box>
          {userContent}
        </Toolbar>
      </AppBar>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 1,
          width: '1300px',
        }}
      >
        {location.pathname !== '/signup' && location.pathname !== '/login' && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
              padding: '20px',
              borderRadius: '10px',
              backgroundColor: '#fff',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
            }}
          >
            <SideBarCategory />
          </Box>
        )}
      </div>
    </>
  );
}
