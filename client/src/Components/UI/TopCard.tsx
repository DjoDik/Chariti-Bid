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
  Row,
} from 'reactstrap';
import { ItemType } from '../types/itemType';
import Timer from './Timer';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { sortTopItems, updateSellStatus } from '../Redux/slice/topSlice';


type PropType = {
  itemTop: ItemType;
  onBid: (id: number, countBid: number, userId: number) => void;
};

export default function TopCard({ itemTop, onBid,setSellStatus }: PropType): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countBid, setCountBid] = useState(0);
  const user = useAppSelector((state) => state.user);
  const timerId = useAppSelector((state) => state.timer);
  const [bidCheck, setBidCheck] = useState(false);
  const dispatch = useAppDispatch()
  // const handleSort = () => {
  //   dispatch(sortTopItems()); 
  // };
  useEffect(() => {
    dispatch(sortTopItems())
  },[itemTop.price])
  
  useEffect(() => {
    dispatch(updateSellStatus(itemTop.id))
  },[itemTop.sellStatus])

  useEffect(() => {
    if (!isModalOpen) {
    }
  }, [isModalOpen]);

  useEffect(() => {
    if(timerId.id === itemTop.id) {
      setBidCheck(true)
    }
  })

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setCountBid(0);
  };

  const clickHandler = () => {
    onBid(itemTop.id, countBid, user.id)
    setBidCheck(true)
    // handleSort()
  }

  const counterBidHandler = () => {
    setCountBid(countBid + 100);
  };

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
               <Timer setSellStatus={setSellStatus} bidCheck={bidCheck} id={itemTop.id} setBidCheck={setBidCheck}/>
              </CardTitle>
          <CardTitle tag="h5"></CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6"></CardSubtitle>
          <CardText>{itemTop.title}</CardText>
          <div className='bidButton'>
          <Button color="danger" onClick={toggleModal}>
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
                Таймер:<Timer bidCheck={bidCheck} id={itemTop.id} />
              </CardTitle>
              <CardFooter>
                {user.status ? (  <><Button className="w-50 mt-4" color="primary" onClick={counterBidHandler}>
                  Поднять на: 100р
                </Button>
                <Button
                  className="w-50 mt-4"
                  color="danger"
                  onClick={() => clickHandler()}
                >
                  Bid
                </Button>
                </>) : ('Для участия в торгах - зарегистрируйтесь')}
               
              </CardFooter>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
}
