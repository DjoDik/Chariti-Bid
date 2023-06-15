import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { getItemThunk } from '../Redux/slice/itemSlice';
import TopCard from './TopCard';
import { ItemType } from '../types/itemType';
import { getTopItemThunk, sortTopItems } from '../Redux/slice/topSlice';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

type PropsType = {
  handleBid: (id: number, countBid: number, userId: number) => void;
};

export default function SideBarAucTop({ handleBid }: PropsType): JSX.Element {
  const [sellStatus, setSellStatus] = useState(false);
  const dispatch = useAppDispatch();
  const sortedTop = useAppSelector((store) => store.top.sortedTop);

  useEffect(() => {
    dispatch(getTopItemThunk());
  }, [sellStatus]);
console.log("qwe",sellStatus)


  

  return (
    <Container>
     
      <TransitionGroup>
        {sortedTop.map((itemTop) => (
          <CSSTransition
            key={itemTop.id}
            classNames={{
              enter: 'right-slide-enter',
              enterActive: 'right-enter-active',
              exit: 'right-slide-exit',
              exitActive: 'right-exit-active',
            }}
            timeout={1500}
          >
            <div className="box">
              <TopCard setSellStatus={setSellStatus} itemTop={itemTop} onBid={handleBid} />
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Container>
  );
}
