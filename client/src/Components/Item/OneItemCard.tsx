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
import Timer from '../UI/Timer';
import axios from 'axios';
import { useAppSelector } from '../Redux/hooks';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

type PropsType = {
  oneCard: ItemType;
  onBid: (id: number, countBid: number, userId: number) => void;
};

function OneItemCard({ oneCard, onBid }: PropsType): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countBid, setCountBid] = useState(0);
  const userId = useAppSelector((state) => state.user.id);
  const [bidCheck, setBidCheck] = useState(false);

  const clickHandler = () => {
    onBid(oneCard.id, countBid, userId)
    setBidCheck(true)
  }
  

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
      <Card style={{ width: '20rem', margin: '10px' }}>
        {oneCard?.FotoGaleries[0]?.img ? (
          <img
            alt="Пример"
            src={`http://localhost:3001/photo/${oneCard?.FotoGaleries[0]?.img}`}
            style={{ margin: '10px' }}
          />
        ) : (
          <div>Нет изображения</div>
        )}
        <CardBody>
          <CardTitle tag="h5">{oneCard.title}</CardTitle>
          <CardTitle tag="h5">Город: {oneCard.city}</CardTitle>
          <CardTitle tag="h5">Текущая цена: {oneCard.price}</CardTitle>
          <Button onClick={toggleModal}>Смотреть</Button>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{oneCard.title}</ModalHeader>
        <ModalBody>
          <Card>
            <Carousel showArrows={true} showThumbs={true}>
              {oneCard?.FotoGaleries.map((image) => (
                <div key={image.id}>
                  <img
                    alt="Пример"
                    src={`http://localhost:3001/photo/${image.img}`}
                    style={{ margin: '10px' }}
                  />
                </div>
              ))}
            </Carousel>
            <CardBody>
              <CardText tag="h5">{oneCard.body}</CardText>
              <CardText tag="h5">Город: {oneCard.city}</CardText>
              <CardTitle tag="h5">
                Стоимость: {oneCard.price} ID последнего пользователя: {oneCard.lastUser_id}
              </CardTitle>
             
              <CardTitle style={{ color: 'red' }}>
               Таймер: <Timer  countBid={oneCard.price} id={oneCard.id} />
              </CardTitle>
              <CardTitle tag="h5">
                Последний BID-ID: {oneCard.lastUser_id}
              </CardTitle>
              <CardFooter>
              <CardTitle tag="h5" style={{ color: 'red' }}>Ваша ставка:{countBid}</CardTitle>
                <Button className="w-50 mt-4" color="primary" onClick={() => counterBidHandler()}>
                  Поднять на: 100р
                </Button>
                <Button
                  className="w-50 mt-4"
                  color="danger"
                  onClick={() => clickHandler()}
                >
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
