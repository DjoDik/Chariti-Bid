import React from 'react';
import { ListItemButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { closeModal, openModal } from '../../Redux/slice/modalSlice';
import LkMainPage from './AddItemModal';

type Props = {
  children?: JSX.Element;
  redirect: string;
  isAllowed: boolean;
};
export default function LeftSideMenu({}: Props) {
  const userId = useAppSelector((store) => store.user);
  const { id } = userId;

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
        position: 'absolute',
        width: '300px',
        height: '250px',
        top: '100%',
        backgroundColor: '#white',
        mt: 5,
      }}
    >
      <ListItemButton component={Link} to="/basket">
        Корзина
      </ListItemButton>
      <ListItemButton onClick={() => handleOpenModal()}>
        <LkMainPage />
        Добавить товар
      </ListItemButton>
      <ListItemButton component={Link} to={`/useritem/${id}`}>
        Мои товары
      </ListItemButton>
    </Box>
  );
}
