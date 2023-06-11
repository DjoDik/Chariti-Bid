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

export default function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLeftMenuOpen, setLeftMenuOpen] = useState(false);
  const isUserLoggedIn = user.id || localStorage.getItem('user');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(checkUserThunk());
  }, [dispatch]);

  const logoutHandler = (): void => {
    dispatch(logoutThunk());
  };

  const toggleMenu = (): void => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleLeftMenu = (): void => {
    setLeftMenuOpen(!isLeftMenuOpen);
  };

  const closeMenu = (): void => {
    setMenuOpen(false);
  };

  const closeLeftMenu = (): void => {
    setLeftMenuOpen(false);
  };

  const [bgImages] = useState([bg1, bg2, bg3, bg4]);
  const [currentBgImageIndex, setCurrentBgImageIndex] = useState(0);
  const currentBgImage = bgImages[currentBgImageIndex];
  const [isImageLoaded, setImageLoaded] = useState(false);

  const changeBackgroundImage = () => {
    setImageLoaded(false);
    setTimeout(() => {
      setCurrentBgImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
      setImageLoaded(true);
    }, 1000); // Задержка перед сменой и отображением новой фоновой картинки (в миллисекундах)
  };

  useEffect(() => {
    const intervalId = setInterval(changeBackgroundImage, 500000); // Здесь 5000 - интервал в миллисекундах, через который будет меняться фоновая картинка

    return () => {
      clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
    };
  }, []);
  let userContent = null;

  if (user.id) {
    userContent = (
      <Box sx={{ position: 'relative' }}>
        <Button onClick={toggleMenu}>
          <Avatar
            alt="User Avatar"
            src={`http://localhost:3001/${user.avatar}`}
            sx={{
              width: 40,
              height: 40,
              transition: 'all 0.3s',
              '&:hover': {
                width: 50,
                height: 50,
              },
            }}
          />{' '}
        </Button>
        {isMenuOpen && isUserLoggedIn && (
          <ClickAwayListener onClickAway={closeMenu}>
            <Box
              ref={menuRef}
              sx={{
                position: 'absolute',
                width: '500px',
                height: '300px',
                top: '100%',
                right: 0,
                zIndex: 1,
                backgroundColor: '#DFF0D8',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                mt: 1,
              }}
            >
              <List component="nav">
                <Avatar
                  alt="User Avatar"
                  src={`http://localhost:3001/${user.avatar}`}
                  sx={{
                    width: 150,
                    height: 150,
                  }}
                />
                <ListItem disablePadding>
                  <ListItemButton onClick={toggleLeftMenu} style={{ color: 'black' }}>
                    Личный кабинет
                  </ListItemButton>
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
          </ClickAwayListener>
        )}
        {isLeftMenuOpen && <LeftSideMenu onClose={closeLeftMenu} />}
      </Box>
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

  // Rest of the code...

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, mr: 2 }}>
            Logo
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }} component={Link} to="/">
            <Button type="button" style={{ height: '40px' }}>
              <img style={{ height: '50px', borderRadius: '10px' }} src="/logo.png" alt="#" />
            </Button>
            <Typography
              variant="h6"
              component="div"
              sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#B51718' }}
            >
              CHARITY BID{' '}
            </Typography>
          </Box>
        </Box>
        {userContent}
      </Box>
      <Box
        className={`background-container ${isImageLoaded ? 'image-loaded' : ''}`}
        sx={{
          // backgroundImage: `url(${currentBgImage})`,
          animation: `${isImageLoaded ? 'fade-in 0.5s ease' : 'fade-out 0.5s ease'} forwards`, // Анимация появления/исчезания
          height: '400px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          // minHeight: 'calc(100vh - 60px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isImageLoaded ? 1 : 0, // Прозрачность фоновой картинки
          transition: 'opacity 0.5s ease', // Плавная анимация перехода
        }}
      >
        {' '}
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
