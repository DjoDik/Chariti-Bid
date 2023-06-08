import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './Redux/hooks';
import { getItemThunk } from './Redux/slice/itemSlice';
import { Col, Container, Row } from 'reactstrap';
import { CardGroup } from 'reactstrap';

import OneItemCard from './Item/OneItemCard';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItemThunk());
  }, []);

  const item = useAppSelector((store) => store.item);

  return (
    <CardGroup>
      <Row className="justify-content-center">
          {item.map((el) => (
            <OneItemCard oneCard={el} />
          ))}
      </Row>
    </CardGroup>
  );
}
