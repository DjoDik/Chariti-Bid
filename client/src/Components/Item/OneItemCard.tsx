import React, { useState, useEffect } from 'react';
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

type PropsType = {
  oneCard: ItemType;
};

export default function OneItemCard({ oneCard }: PropsType): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countBid, setCountBid] = useState(0);

  useEffect(() => {
    if (!isModalOpen) {
      setCountBid(0);
    }
  }, [isModalOpen]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const counterBidHandler = () => {
    
    setCountBid(countBid + 100);
  };

  return (
    <>
      <Card
        style={{
          width: '13rem',
          margin: '10px',
        }}
      >
        <img alt="Sample" src={oneCard?.FotoGaleries[0]?.img} style={{ margin: '10px' }} />
        <CardBody>
          <Button onClick={toggleModal}>Смотреть</Button>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{oneCard.title}</ModalHeader>
        <ModalBody>
          <Card>
            <img alt="Sample" src={oneCard?.FotoGaleries[0]?.img} style={{ margin: '10px' }} />
            <CardBody>
              <CardText tag="h5">{oneCard.body}</CardText>
              <CardText tag="h5">Ставка:{oneCard.price}</CardText>
              <CardText tag="h5">Город:{oneCard.city}</CardText>
              <CardTitle tag="h5">Ваша ставка:{countBid}</CardTitle>
              <CardFooter>
                <Button className="w-50 mt-4" color="primary" onClick={() => counterBidHandler()}>
                  Поднять на: 100р
                </Button>
                <Button className="w-50 mt-4" color="danger">
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
