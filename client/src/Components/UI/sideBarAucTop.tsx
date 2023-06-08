import React, { useEffect } from 'react'
import { Container } from 'reactstrap'
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { getItemThunk } from '../Redux/slice/itemSlice';
import TopCard from './TopCard';
import { ItemType } from '../types/itemType';

export default function SideBarAucTop(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getItemThunk());
  }, []);
  const allTop = useAppSelector((store) => store.item);
  console.log(allTop)
  return (
    <Container>
      {allTop.map((itemTop:ItemType) => <TopCard itemTop={itemTop}/>)}
    </Container>
  )
}
