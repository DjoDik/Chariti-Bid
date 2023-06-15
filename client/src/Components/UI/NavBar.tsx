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
import LeftSideMenu from '../LK/UI/LeftSideMenu';
import { setAvatar } from '../Redux/slice/avatarSlice';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { CSSTransition } from 'react-transition-group';
export default function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);
  const avatar = useAppSelector((store) => store.avatar);

  const location = useLocation();
  console.log('location', location.pathname !== '/signup');

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
          <div style={{ position: 'relative', marginTop: '150px' }}>
            <Button
              onClick={handleAvatarClick}
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <Avatar
                alt="User Avatar"
                src={avatar}
                sx={{
                  width: 140,
                  height: 140,
                  transition: 'all 0.3s',
                  '&:hover': {
                    width: 150,
                    height: 150,
                  },
                }}
              />
              <p className="profile-text">Profile</p>
            </Button>
          </div>

          {isUserMenuOpen && (
            <Box
              ref={userMenuRef}
              sx={{
                display: 'flex',
                // justifyContent: 'space-around',
                position: 'absolute',
                width: '200px',
                height: '220px',
                // top: '100%',
                right: 0,
                zIndex: 1,
                backgroundColor: 'white',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                mt: 1,
                // overflowY: 'auto',
              }}
            >
              <List component="nav">
                <ListItem disablePadding>
                  <LeftSideMenu />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/userprofile" style={{ color: 'black' }}>
                    Настройки
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton onClick={logoutHandler} style={{ color: 'black' }}>
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
        <Button component={Link} to="/signup" style={{ color: '#B51718' }}>
          Регистрация
        </Button>
        <Button component={Link} to="/login" style={{ color: '#B51718' }}>
          Вход
        </Button>
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          zIndex: 2,
          position: 'relative',
          px: 4,
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
          }}
        >
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
      </Box>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', zIndex: 1 }}>
        {(location.pathname !== '/signup' && location.pathname !== '/login') && (
         <Box
            className={`background-container ${isImageLoaded ? 'image-loaded' : ''}`}
            sx={{
              height: '250px',
              backgroundRepeat: 'no-repeat',
              width: '800px',
              opacity: isImageLoaded ? 1 : 0,
              transition: 'opacity 1s ease'     
            }}
          >
            <img
              className="background-image"
              src={currentBgImage}
              alt="Background"
              onLoad={() => setImageLoaded(true)}
            />
          </Box>
          
        )}
      </div>
    </>
  );
}
