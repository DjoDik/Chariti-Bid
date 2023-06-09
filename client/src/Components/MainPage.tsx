import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './Redux/hooks';
import { getItemThunk } from './Redux/slice/itemSlice';
import { Col, Container, Row } from 'reactstrap';
import { CardGroup } from 'reactstrap';

import OneItemCard from './Item/OneItemCard';
import { selectItems } from './Redux/slice/sortSlice';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItemThunk());
  }, []);

  const item = useAppSelector(selectItems);

  return (
    <CardGroup>
      <Row className="justify-content-center">
        {item.map((el) => (
          <OneItemCard key={el.id} oneCard={el} />
        ))}
      </Row>
    </CardGroup>
  );
}
