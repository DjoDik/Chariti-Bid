import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { ItemType } from '../types/itemType';
import Timer from '../UI/Timer';
import axios from 'axios';
import { useAppSelector } from '../Redux/hooks';





type PropsType = {
  oneCard: ItemType;
  onBid: (id: number, countBid: number, userId: number) => void;
};

function OneItemCard({ oneCard, onBid }: PropsType): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countBid, setCountBid] = useState(0);
const userId = useAppSelector(state => state.user.id)



  useEffect(() => {
    if (!isModalOpen) {
    }
  }, [isModalOpen]);


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setCountBid(0);
  };

  const counterBidHandler = () => {
    setCountBid(countBid + 100); 
  };


  return (
    <>
    
      <Card style={{ width: '13rem', margin: '10px' }}>
        {/* <img alt="Sample" src={oneCard?.FotoGaleries[0]?.img} style={{ margin: '10px' }} /> */}
        <CardBody>
          <CardTitle tag="h5"></CardTitle>
          <Button onClick={toggleModal}>Смотреть</Button>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{oneCard.title}</ModalHeader>
        <ModalBody>
          <Card>
            {/* <img alt="Sample" src={oneCard?.FotoGaleries[0]?.img} style={{ margin: '10px' }} /> */}
            <CardBody>
              <CardText tag="h5">{oneCard.body}</CardText>             
              <CardText tag="h5">Город:{oneCard.city}</CardText>
              <CardTitle tag="h5">Стоимость:{oneCard.price} ID last user:{oneCard.lastUser_id}</CardTitle>
              <CardTitle tag="h5">Ваша ставка:{countBid}</CardTitle>
              <CardTitle ><Timer countBid={oneCard.price} id={oneCard.id}/></CardTitle>
              <CardFooter>
                <Button className="w-50 mt-4" color="primary" onClick={() => counterBidHandler()}>
                  Поднять на: 100р
                </Button>
                <Button className="w-50 mt-4" color="danger" onClick={() => onBid(oneCard.id, countBid, userId)}>
                  Bid
                </Button>
              </CardFooter>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
}
export default React.memo(OneItemCard);
