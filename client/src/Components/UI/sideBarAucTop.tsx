import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { getItemThunk } from '../Redux/slice/itemSlice';
import TopCard from './TopCard';
import { ItemType } from '../types/itemType';

export default function SideBarAucTop(): JSX.Element {
  const allTop = useAppSelector((store) => store.item.allProduct);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItemThunk());
  }, [dispatch]);

  const top = allTop
    .filter((item) => item.name !== 'Все')
    .sort((a, b) => b.Items[0].price - a.Items[0].price)
    .slice(0, 5);

  if (top.length === 0) {
    return <div>Loading...</div>; // Или любой другой заглушка/индикатор загрузки
  }

  return (
    <Container>
      {top.map((itemTop: ItemType) => (
        <TopCard key={itemTop.id} itemTop={itemTop} />
      ))}
    </Container>
  );
}
