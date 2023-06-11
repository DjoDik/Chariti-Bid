import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { useAppSelector } from '../../Redux/hooks';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

type Props = {
  toggle: void;
};

export default function LeftSideMenu({ toggle }: Props) {
  const userId = useAppSelector((store) => store.user);
  const { id } = userId;

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
        <ListGroupItem href="#" onClick={() => toggle()} style={{ backgroundColor: 'transparent' }}>
          Добавить товар
        </ListGroupItem>
        <ListGroupItem
          onClick={() => (window.location = `/useritem/${id}`)}
          style={{ backgroundColor: 'transparent' }}
        >
          Мои товары
        </ListGroupItem>
      </ListGroup>
    </Box>
  );
}
