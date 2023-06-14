import React from 'react';
import { ListItemButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { Link, NavLink } from 'react-router-dom';
import { Box } from '@mui/material';
import { closeModal, openModal } from '../../Redux/slice/modalSlice';
import LkMainPage from './AddItemModal';

type Props = {
  children?: JSX.Element;
  redirect: string;
  isAllowed: boolean;
};

export default function LeftSideMenu({}: Props) {
  const user = useAppSelector((store) => store.user);
  const { id, name } = user;

  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Box
      sx={{
        width: '200px',
        height: '120px',
        backgroundColor: '#white',
        overflowY: 'auto',
      }}
    >
      <div>
        {/* {`${name} `} */}
        <ListItemButton
          component={NavLink}
          to="/basket"
          button
          sx={{ justifyContent: 'flex-start' }}
        >
          Корзина
        </ListItemButton>
        <ListItemButton onClick={() => handleOpenModal()} sx={{ justifyContent: 'flex-start' }}>
          <LkMainPage />
          Добавить товар
        </ListItemButton>
        <ListItemButton
          component={Link}
          to={`/useritem/${id}`}
          button
          sx={{ justifyContent: 'flex-start' }}
        >
          Мои товары
        </ListItemButton>
      </div>
    </Box>
  );
}
