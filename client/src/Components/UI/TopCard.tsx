import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardSubtitle, CardText, CardTitle, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { ItemType } from '../types/itemType';
import Timer from './Timer';
import { useAppSelector } from '../Redux/hooks';
type PropType = {
  itemTop: ItemType;
  onBid: (id: number, countBid: number, userId: number) => void;
};
export default function TopCard({ itemTop,onBid }: PropType): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countBid, setCountBid] = useState(0);
  const userId = useAppSelector(state => state.user.id)

  useEffect(() => {
    if (!isModalOpen) {
    }
  }, [isModalOpen])
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setCountBid(0);
  };

  const counterBidHandler = () => {
    setCountBid(countBid + 100); 
  };
  
  return (
    <>
    <Card
      style={{
        width: '10rem',
      }}
    >
      <img alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody>
        <CardTitle tag="h5"></CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6"></CardSubtitle>
        <CardText>
          {itemTop.title}
        </CardText>
        <Button className='animated' color='danger' onClick={toggleModal}>Bid:{itemTop.price}</Button>
      </CardBody>
    </Card>
    <Modal isOpen={isModalOpen} toggle={toggleModal}>
    <ModalHeader toggle={toggleModal}>{itemTop.title}</ModalHeader>
    <ModalBody>
      <Card>
        {/* <img alt="Sample" src={oneCard?.FotoGaleries[0]?.img} style={{ margin: '10px' }} /> */}
        <CardBody>
          <CardText tag="h5">{itemTop.body}</CardText>             
          <CardText tag="h5">Город:{itemTop.city}</CardText>
          <CardTitle tag="h5">Стоимость:{itemTop.price}</CardTitle>
          <CardTitle tag="h5">Ваша ставка:{countBid}</CardTitle>
          <CardTitle ><Timer countBid={itemTop.price} id={itemTop.id}/></CardTitle>
          <CardFooter>
            <Button className="w-50 mt-4" color="primary" onClick={() => counterBidHandler()}>
              Поднять на: 100р
            </Button>
            <Button className="w-50 mt-4" color="danger" onClick={() => onBid(itemTop.id, countBid, userId)}>
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
