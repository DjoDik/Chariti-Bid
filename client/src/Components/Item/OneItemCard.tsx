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
// Подключите файл стилей CSS

import '../../css/shine-button.css';
import '../../css/OneItemCard.css';
import '../../css/custom-buttons.css';

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
      <Card style={{ width: '400px', height: '550px', margin: '10px' }}>
        <CardBody style={{ alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {oneCard?.FotoGaleries[0]?.img ? (
              <img
                alt="Пример"
                src={`http://localhost:3001/photo/${oneCard?.FotoGaleries[0]?.img}`}
                style={{
                  margin: '10px',
                  width: '350px',
                  height: '350px',
                  objectFit: 'cover', // Добавленный стиль
                }}
              />
            ) : (
              <div>Нет изображения</div>
            )}
          </div>
          <CardTitle tag="h5">{oneCard.title}</CardTitle>
          <CardTitle tag="h5">Город: {oneCard.city}</CardTitle>
          <CardTitle tag="h5">Текущая цена: {oneCard.price}р</CardTitle>
          <Button onClick={toggleModal}>Смотреть</Button>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} toggle={toggleModal} size="lg">
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
                      style={{
                        margin: '10px',
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain', // Измененный стиль
                      }}
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
                Стоимость: {oneCard.price}р 
              </CardTitle>
              <CardTitle tag="h5">
                Имя последнего пользователя сделавшего ставку: {user.username}
              </CardTitle>
              <CardTitle style={{ color: 'red' }}>
                Таймер: <Timer bidCheck={bidCheck} id={oneCard.id} setBidCheck={setBidCheck} />
              </CardTitle>
              <CardFooter>
                {user.id !== oneCard.user_id && (
                  <>
                    {user.status ? (
                      <>
                        <CardTitle tag="h5" style={{ color: 'red' }}>
                          Ваша ставка: {countBid}р
                        </CardTitle>

                        <div className="b1">
                          <Button class=" shine-button" onClick={counterBidHandler}>
                            Поднять на 100р
                          </Button>
                        </div>
                        <div className="b2">
                          <Button className="custom-button sliding-button" onClick={clickHandler}>
                            Bid
                          </Button>
                        </div>
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
