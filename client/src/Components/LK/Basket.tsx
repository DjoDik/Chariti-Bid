import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, ModalBody } from 'reactstrap';
import { getChatMessageThunk } from '../Redux/slice/chatSlice';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { useParams } from 'react-router-dom';
import ChatCard from '../UI/ChatCard';

import { SEND_MESSAGE } from '../types/wsTypes';

export default function Basket(): JSX.Element {
  

  const userId = useAppSelector((store) => store.user.id);
  
  const userItemselld = useAppSelector((store) => store.chat.chat)
 
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getChatMessageThunk(userId));
    
  }, []);
  const handleSendMessage = (item_id: number, userId: number, body: string) => {
    dispatch({ type: SEND_MESSAGE, payload: {item_id, userId, body } });
  };
 
console.log("BASKET",userItemselld)
  return (
    <>
      <div>basket</div>
      {userItemselld.map((el) => <ChatCard handleSendMessage={handleSendMessage} key={el.id} el={el} />)}
    
      
      
    </>
  );
}
