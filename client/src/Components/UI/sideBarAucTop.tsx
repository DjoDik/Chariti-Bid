import React, { useEffect } from 'react'
import { Container } from 'reactstrap'
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { getItemThunk } from '../Redux/slice/itemSlice';
import TopCard from './TopCard';
import { ItemType } from '../types/itemType';
import { getTopItemThunk } from '../Redux/slice/topSlice';
type PropsType = {
  
  handleBid: (id: number, countBid: number, userId: number) => void;
};
export default function SideBarAucTop({handleBid}:PropsType): JSX.Element {
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTopItemThunk());
  }, []);
  const allTop = useAppSelector((store) => store.top.top);
 
  return (
    <Container>
      {allTop.map((itemTop) => <TopCard key = {itemTop.id} itemTop={itemTop} onBid={handleBid}  />)}
    </Container>
    
  )
}
