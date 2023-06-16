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
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { sortTopItems } from '../Redux/slice/topSlice';

type PropType = {
  itemTop: ItemType;
  onBid: (id: number, countBid: number, userId: number) => void;
};

export default function TopCard({ itemTop, onBid }: PropType): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countBid, setCountBid] = useState(0);
  const user = useAppSelector((state) => state.user);
  const [bidCheck, setBidCheck] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(sortTopItems());
  }, [itemTop.price]);

  useEffect(() => {
    if (!isModalOpen) {
    }
  }, [isModalOpen]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setCountBid(0);
  };

  const clickHandler = () => {
    onBid(itemTop.id, countBid, user.id);
    setBidCheck(true);
  };

  const counterBidHandler = () => {
    setCountBid(countBid + 100);
  };

  return (
    <>
      <Card style={{ width: '190px', height: '280px', padding: '15px', marginRight: '10px' }}>
        {itemTop?.FotoGaleries && itemTop?.FotoGaleries.length > 0 ? (
          <img
            alt="Пример"
            src={`http://localhost:3001/photo/${itemTop?.FotoGaleries[0]?.img}`}
            style={{
              marginBottom: '10px',
              width: '150px',
              height: '90px',
              backgroundPosition: 'center',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div>Нет изображения</div>
        )}
        <CardBody
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            textAlign: 'center',
          }}
        >
          <CardTitle style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>
            {itemTop.title}
          </CardTitle>
          <CardTitle style={{ fontSize: '14px', color: 'red', marginBottom: '5px' }}>
            <Timer bidCheck={bidCheck} id={itemTop.id} setBidCheck={setBidCheck} />
          </CardTitle>
          <div className="bidButton">
            <Button color="danger" style={{ flex: '1' }} onClick={toggleModal}>
              Bid: {itemTop.price}
            </Button>
          </div>
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
                      style={{
                        margin: '10px',
                        width: '450px',
                        height: '550px',
                        // objectFit: 'contain',
                      }}
                      alt="Пример"
                      src={`http://localhost:3001/photo/${image.img}`}
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
                Таймер:
                <Timer bidCheck={bidCheck} id={itemTop.id} />
              </CardTitle>
              <CardFooter>
                {user.status ? (
                  <>
                    <Button className="w-50 mt-4" color="primary" onClick={counterBidHandler}>
                      Поднять на: 100р
                    </Button>
                    <Button className="w-50 mt-4" color="danger" onClick={() => clickHandler()}>
                      Bid
                    </Button>
                  </>
                ) : (
                  'Для участия в торгах - зарегистрируйтесь'
                )}
              </CardFooter>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
}
