import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardSubtitle,
  CardText,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { ItemType } from '../types/itemType';
import Timer from './Timer';
import { useAppSelector } from '../Redux/hooks';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


type PropType = {
  itemTop: ItemType;
  onBid: (id: number, countBid: number, userId: number) => void;
};

export default function TopCard({ itemTop, onBid }: PropType): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countBid, setCountBid] = useState(0);
  const userId = useAppSelector(state => state.user.id)
  const [bidCheck, setBidCheck] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
    }
  }, [isModalOpen]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setCountBid(0);
  };

  const clickHandler = () => {
    onBid(itemTop.id, countBid, userId)
    setBidCheck(true)
  }

  const counterBidHandler = () => {
    setCountBid(countBid + 100);
  };
  console.log('=======555=====>', itemTop);

  return (
    <>
      <Card style={{ width: '10rem' }}>
        {itemTop?.FotoGaleries && itemTop?.FotoGaleries.length > 0 ? (
          <img
            alt="Пример"
            src={`http://localhost:3001/photo/${itemTop?.FotoGaleries[0]?.img}`}
            style={{ margin: '10px' }}
          />
        ) : (
          <div>Нет изображения</div>
        )}
        <CardBody>
        <CardTitle style={{ color: 'red',marginTop:"20px" }}>
               <Timer  countBid={itemTop.price} id={itemTop.id} />
              </CardTitle>
          <CardTitle tag="h5"></CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6"></CardSubtitle>
          <CardText>{itemTop.title}</CardText>
          <Button color="danger" onClick={toggleModal}>
            Bid: {itemTop.price}
          </Button>
         
         
          
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{itemTop.title}</ModalHeader>
        <ModalBody>
          <Card>
            {itemTop?.FotoGaleries && itemTop?.FotoGaleries.length > 0 ? (
              <Carousel showArrows={true} showThumbs={true}>
                {itemTop?.FotoGaleries.map((image) => (
                  <div key={image.id}>
                    <img
                      alt="Пример"
                      src={`http://localhost:3001/photo/${image.img}`}
                      style={{ margin: '10px' }}
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <div>Нет изображений</div>
            )}
            <CardBody>
              <CardText tag="h5">{itemTop.body}</CardText>
              <CardText tag="h5">Город: {itemTop.city}</CardText>
              <CardTitle tag="h5">Стоимость: {itemTop.price}</CardTitle>
              <CardTitle tag="h5">Ваша ставка: {countBid}</CardTitle>
              <CardTitle style={{ color: 'red' }}>
                Таймер:<Timer countBid={itemTop.price} id={itemTop.id} />
              </CardTitle>
              <CardFooter>
                <Button className="w-50 mt-4" color="primary" onClick={counterBidHandler}>
                  Поднять на: 100р
                </Button>
                <Button
                  className="w-50 mt-4"
                  color="danger"
                  onClick={() => onBid(itemTop.id, countBid, userId)}
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
