import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {  useAppSelector } from '../../Redux/hooks';
import { Link } from 'react-router-dom';

type Props = {
    toggle: void
}

export default function LeftSideMenu({toggle}: Props) {
    const userId = useAppSelector((store) => store.user)
    const {id} = userId

  return (
    <ListGroup>
      <ListGroupItem tag={Link} to="/cabinet/basket" action>
        Корзина
      </ListGroupItem>
      <ListGroupItem href='#' onClick={() => toggle()}>Добвить товар</ListGroupItem>
      <ListGroupItem  onClick={() => window.location = `/useritem/${id}`} >Мои товары</ListGroupItem>
    </ListGroup>
  );
}

