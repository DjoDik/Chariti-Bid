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
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import { ItemType } from '../types/itemType';
import Timer from '../UI/Timer';
import axios from 'axios';
import { useAppSelector } from '../Redux/hooks';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../css/OneItemCard.css'; // Подключите файл стилей CSS

type PropsType = {
  oneCard: ItemType;
  onBid: (id: number, countBid: number, userId: number) => void;
};

function OneItemCard({ oneCard, onBid }: PropsType): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countBid, setCountBid] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const user = useAppSelector((state) => state.user);
  const [bidCheck, setBidCheck] = useState(false);
  console.log('bidCheck', bidCheck);

  const clickHandler = () => {
    onBid(oneCard.id, countBid, user.id);
    setBidCheck(true);
  };

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

  const next = () => {
    const nextIndex = activeIndex === oneCard.FotoGaleries.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    const nextIndex = activeIndex === 0 ? oneCard.FotoGaleries.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex: number) => {
    setActiveIndex(newIndex);
  };

  return (
    <>
      <Card style={{ width: '20rem', margin: '10px' }}>
        <CardBody style={{ alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {oneCard?.FotoGaleries[0]?.img ? (
              <img
                alt="Пример"
                src={`http://localhost:3001/photo/${oneCard?.FotoGaleries[0]?.img}`}
                style={{ margin: '10px', width: '250px', height: '250px' }}
              />
            ) : (
              <div>Нет изображения</div>
            )}
          </div>
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
            <Carousel
              activeIndex={activeIndex}
              next={next}
              previous={previous}
              ride="carousel"
              interval={false}
            >
              <CarouselIndicators
                items={oneCard?.FotoGaleries.map((image) => ({ src: image.img }))}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
              />
              {oneCard?.FotoGaleries.map((image) => (
                <CarouselItem key={image.id} onExiting={() => {}} onExited={() => {}}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                      alt="Пример"
                      src={`http://localhost:3001/photo/${image.img}`}
                      style={{ margin: '10px', width: '250px', height: '250px' }}
                    />
                  </div>
                  <CarouselCaption captionText="" captionHeader="" />
                </CarouselItem>
              ))}
              <CarouselControl
                direction="prev"
                className="custom-carousel-control-prev"
                onClickHandler={previous}
              />
              <CarouselControl
                direction="next"
                className="custom-carousel-control-next"
                onClickHandler={next}
              />
            </Carousel>
            <CardBody>
              <CardText tag="h5">{oneCard.body}</CardText>
              <CardText tag="h5">Город: {oneCard.city}</CardText>
              <CardTitle tag="h5">
                Стоимость: {oneCard.price} имя последнего пользователя: {user.username}
              </CardTitle>

              <CardTitle style={{ color: 'red' }}>
                Таймер: <Timer bidCheck={bidCheck} id={oneCard.id} setBidCheck={setBidCheck} />
              </CardTitle>
              <CardTitle tag="h5">Последний BID-ID: {oneCard.lastUser_id}</CardTitle>
              <CardFooter>
                {user.id !== oneCard.user_id && (
                  <>
                    {user.status ? (
                      <>
                        <CardTitle tag="h5" style={{ color: 'red' }}>
                          Ваша ставка: {countBid}
                        </CardTitle>
                        <Button
                          className="w-50 mt-4"
                          color="primary"
                          onClick={() => counterBidHandler()}
                        >
                          Поднять на: 100р
                        </Button>
                        <Button className="w-50 mt-4" color="danger" onClick={() => clickHandler()}>
                          Bid
                        </Button>
                      </>
                    ) : (
                      'Для участия в торгах - зарегистрируйтесь'
                    )}
                  </>
                )}
              </CardFooter>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
}

export default React.memo(OneItemCard);
