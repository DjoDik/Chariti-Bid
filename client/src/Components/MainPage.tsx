import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './Redux/hooks';
import { getItemThunk } from './Redux/slice/itemSlice';
import { Col, Container, Row } from 'reactstrap';
import { CardGroup } from 'reactstrap';

import OneItemCard from './Item/OneItemCard';
import SideBarCategory from './UI/sideBarCategory';
import { SOCKET_INIT, UPDATE_PRICE } from './types/wsTypes';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const items = useAppSelector((store) => store.sort.allProduct);

  const handleBid = (id: number, countBid: number,userId:number) => {
    dispatch({ type: UPDATE_PRICE, payload: { id, countBid, userId } });
  };

  return (
    <Row>
      <Col xs="auto">
        <SideBarCategory />
      </Col>
      <Col>
        <CardGroup>
          <Row className="justify-content-center">
            {items.map((el) => (
              <OneItemCard oneCard={el} key={el.id} onBid={handleBid} />
            ))}
          </Row>
        </CardGroup>
      </Col>
    </Row>
  );
}
