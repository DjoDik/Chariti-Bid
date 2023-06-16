import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './Redux/hooks';
import { Col, Row, Container } from 'reactstrap';
import { CardGroup } from 'reactstrap';

import OneItemCard from './Item/OneItemCard';
import SideBarCategory from './UI/sideBarCategory';
import { SOCKET_INIT, UPDATE_PRICE } from './types/wsTypes';
import axios from 'axios';
import { SortItemThunk } from './Redux/slice/sortSlice';
import { log } from 'console';

type PropsType = {
  handleBid: (id: number, countBid: number, userId: number) => void;
};

export default function MainPage({ handleBid }: PropsType): JSX.Element {
  const items = useAppSelector((store) => store.sort.allProduct);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(SortItemThunk('Все'));
  }, []);

  console.log('items', items);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <CardGroup style={{ marginLeft: '200px', justifyContent: 'flex-start' }}>
            <Row>
              {items.map((el) => (
                <OneItemCard oneCard={el} key={el.id} onBid={handleBid} />
              ))}
            </Row>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}
