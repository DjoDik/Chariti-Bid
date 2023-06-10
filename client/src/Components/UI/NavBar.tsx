import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { logoutThunk, checkUserThunk } from '../Redux/slice/userSlice';

export default function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const isUserLoggedIn = user.id || localStorage.getItem('user'); // Проверка наличия пользователя в Redux-стейте или localStorage

  useEffect(() => {
    dispatch(checkUserThunk());
  }, [dispatch]);

  const logoutHandler = (): void => {
    dispatch(logoutThunk());
  };

  const toggleMenu = (): void => {
    setMenuOpen(!isMenuOpen);
  };

  let userContent = null;

  if (user.id) {
    userContent = (
      <Box sx={{ position: 'relative' }}>
        <Button onClick={toggleMenu}>
          <Avatar
            alt="User Avatar"
            src="/static/images/avatar/1.jpg"
            sx={{
              width: 40,
              height: 40,
              transition: 'all 0.3s',
              '&:hover': {
                width: 50,
                height: 50,
              },
            }}
          />
        </Button>
        {isMenuOpen && isUserLoggedIn && (
          <Box
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
                src="/static/images/avatar/1.jpg"
                sx={{
                  width: 150,
                  height: 150,
                }}
              />
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/profile" style={{ color: 'black' }}>
                  Личный кабинет
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
    <AppBar position="static" sx={{ backgroundColor: 'Gold' }}>
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
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
              CHARITY BID{' '}
            </Typography>
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#B51718' }} />
          {userContent}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
