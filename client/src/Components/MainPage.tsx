import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './Redux/hooks';
import { Col, Row } from 'reactstrap';
import { CardGroup } from 'reactstrap';

import OneItemCard from './Item/OneItemCard';
import SideBarCategory from './UI/sideBarCategory';
import { SOCKET_INIT, UPDATE_PRICE } from './types/wsTypes';
import axios from 'axios';
type PropsType = {
  
  handleBid: (id: number, countBid: number, userId: number) => void;
};
export default function MainPage({handleBid}:PropsType): JSX.Element {
  
  const items = useAppSelector((store) => store.sort.allProduct);

  

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
