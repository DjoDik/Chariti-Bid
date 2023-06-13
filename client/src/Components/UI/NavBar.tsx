import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
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
import '../../Avatar.css';
import LeftSideMenu from '../LK/UI/LeftSideMenu';
import { setAvatar } from '../Redux/slice/avatarSlice';

export default function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);
  const avatar = useAppSelector((store) => store.avatar);

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
    }, 1000); // Delay before changing and displaying the new background image (in milliseconds)
  };

  useEffect(() => {
    const intervalId = setInterval(changeBackgroundImage, 500000); // Interval in milliseconds for changing the background image

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
          <Avatar
            alt="User Avatar"
            src={avatar}
            sx={{
              width: 40,
              height: 40,
              transition: 'all 0.3s',
              '&:hover': {
                width: 50,
                height: 50,
              },
            }}
            onClick={handleAvatarClick}
          />
          {isUserMenuOpen && (
            <Box
              ref={userMenuRef}
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                position: 'absolute',
                width: '200px',
                height: '400px',
                top: '100%',
                right: 0,
                zIndex: 1,
                backgroundColor: 'white',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                mt: 1,
              }}
            >
              <List component="nav">
                <Avatar
                  alt="User Avatar"
                  src={avatar}
                  sx={{
                    width: 150,
                    height: 150,
                  }}
                />
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
                  <ListItemButton onClick={logoutHandler} style={{ color: 'black', top: '130px' }}>
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
          backgroundColor: 'black',
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
            backgroundColor: 'black',
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
            >
              CHARITY BET{' '}
            </Typography>
          </Box>
        </Box>
        {userContent}
      </Box>
      <Box
        className={`background-container ${isImageLoaded ? 'image-loaded' : ''}`}
        sx={{
          height: '400px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isImageLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <img
          className="background-image"
          src={currentBgImage}
          alt="Background"
          onLoad={() => setImageLoaded(true)}
        />
      </Box>
    </>
  );
}
