import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
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
        width: '500px',
        height: '300px',
        bottom: '-650px',
        right: 0,
        zIndex: 1,
        backgroundColor: '#DFF0D8',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
        mt: 1,
      }}
    >
      <ListGroup>
        <ListGroupItem
          tag={Link}
          to="/cabinet/basket"
          action
          style={{ backgroundColor: 'transparent' }}
        >
          Корзина
        </ListGroupItem>
        <ListGroupItem onClick={() => handleOpenModal()} style={{ backgroundColor: 'transparent' }}>
          <LkMainPage />
          Добавить товар
        </ListGroupItem>
        <ListGroupItem
          tag={Link}
          to={`/useritem/${id}`}
          action
          style={{ backgroundColor: 'transparent' }}
        >
          Мои товары
        </ListGroupItem>
      </ListGroup>
    </Box>
  );
}
