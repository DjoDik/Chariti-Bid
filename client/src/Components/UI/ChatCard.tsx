import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardText, CardTitle, Container, Input, List, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { ItemType } from '../types/itemType';
import ChatModal from '../LK/UI/ChatModal';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';

import { Carousel } from 'react-responsive-carousel';
import Timer from './Timer';
type PropType = {
  el: ItemType;
};
export default function ChatCard({handleSendMessage,el }: PropType): JSX.Element {
  const [messages, setMessages] = useState('');
 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = useAppSelector((store) => store.user.id);
  const {User,Chats} = el
  // useEffect(() => {
  //   if (!isOpenChat) {
  //   }
  // }, [isOpenChat]);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);

  };

  return (
    <Container>
   <Card style={{ width: '300px', height: '450px', margin: '10px' }}>
        {el?.FotoGaleries[0]?.img ? (
          <img
            alt="Пример"
            src={`http://localhost:3001/photo/${el?.FotoGaleries[0]?.img}`}
            style={{ margin: '10px' }}
          />
        ) : (
          <div>Нет изображения</div>
        )}
        <CardBody>
          <CardTitle tag="h5">{el.title}</CardTitle>
          <CardTitle tag="h5">Город: {el.city}</CardTitle>
         
          <Button onClick={toggleModal}>Смотреть</Button>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{el.title}</ModalHeader>
        <ModalBody>
          <Card>
            <Carousel showArrows={true} showThumbs={true}>
              {el?.FotoGaleries.map((image) => (
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
              <CardText tag="h5">{el.body}</CardText>
              <CardText tag="h5">Город: {el.city}</CardText>
              <CardText tag="h5">Имя продавца: {el.User.username}</CardText>
              <CardText tag="h5">Номер телефона: {el.User.phone}</CardText>
             
             
              
           
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
      
    </Container>
  );
}
