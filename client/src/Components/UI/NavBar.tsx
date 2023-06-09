import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { logoutThunk } from '../Redux/slice/userSlice';
import { checkUserThunk } from '../Redux/slice/userSlice';

export default function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);
  console.log(user.id);
  

  useEffect(() => {
    dispatch(checkUserThunk());
  }, [dispatch]);

  const logoutHandler = (): void => {
    dispatch(logoutThunk());
  };

  const isUserLoggedIn = user.id || localStorage.getItem('user'); // Проверка наличия пользователя в Redux-стейте или localStorage

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
          {isUserLoggedIn ? ( // Проверка наличия пользователя в сессии или localStorage
            <>
              <Button onClick={logoutHandler}>Logout</Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/signup" style={{ color: '#B51718' }}>
                Регистрация
              </Button>
              <Button component={Link} to="/login" style={{ color: '#B51718' }}>
                Вход
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
