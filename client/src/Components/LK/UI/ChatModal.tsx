import React, { useEffect, useState } from 'react';
import { Button, CardFooter, Input, List, Modal, ModalBody } from 'reactstrap';
import Footer from '../../UI/Footer';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { SEND_MESSAGE } from '../../types/wsTypes';

export default function ChatModal({isOpenChat, togleChatModal}): JSX.Element {


  const dispatch = useAppDispatch();
  


  return (
    
  );
}
