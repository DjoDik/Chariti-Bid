import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './Redux/hooks';
import { getItemThunk } from './Redux/slice/itemSlice';
import { Col, Container, Row } from 'reactstrap';
import { CardGroup } from 'reactstrap';

import OneItemCard from './Item/OneItemCard';
import SideBarCategory from './UI/sideBarCategory';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItemThunk());
  }, []);

  const item = useAppSelector((store) => store.item);

  return (
    <Row>
    <Col xs="auto">
      <SideBarCategory />
    </Col>
    <Col>
      <CardGroup>
        <Row className="justify-content-center">
          {item.allProduct.map((el) => (
            <OneItemCard oneCard={el} />
          ))}
        </Row>
      </CardGroup>
    </Col>
  </Row>
  );
}
