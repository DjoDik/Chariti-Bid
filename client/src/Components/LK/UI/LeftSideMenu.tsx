import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {  useAppSelector } from '../../Redux/hooks';

type Props = {
    toggle: void
}

export default function LeftSideMenu({toggle}: Props) {
    const userId = useAppSelector((store) => store.user)
    const {id} = userId

  return (
    <ListGroup>
      <ListGroupItem>Корзина</ListGroupItem>
      <ListGroupItem href='#' onClick={() => toggle()}>Добвить товар</ListGroupItem>
      <ListGroupItem href={`/useritem/${id}`} >Мои товары</ListGroupItem>
    </ListGroup>
  );
}

