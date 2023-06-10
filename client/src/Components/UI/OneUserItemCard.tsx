import React, { useState } from 'react';
import { Button, Card, CardBody, CardTitle, Row, Modal, ModalHeader, ModalBody, Input, CardText } from 'reactstrap';
import { ItemType } from '../types/itemType';
import { deleteThunk, editThunk } from '../Redux/slice/userItemSlice';
import { useAppDispatch } from '../Redux/hooks';
import Footer from './Footer';

type PropsType = {
  oneCard: ItemType;
};

export default function OneUserItemCard({ oneCard }: PropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editedPost, setEditedPost] = useState<ItemType[]>({
    id: oneCard.id,
    title: oneCard.title,
    body: oneCard.body,
    city: oneCard.city,
    price: oneCard.price,
  });

  const deleteHandler = (id: string) => {
    dispatch(deleteThunk(id));
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const saveChanges = () => {
    dispatch(editThunk(editedPost));
    toggleModal();
  };

  return (
    <Card
      style={{
        width: '13rem',
        margin: '10px',
        border: '0px solid white'
      }}
    >
      <img alt="Sample" src={oneCard.img} />
      <CardBody>
        <CardTitle tag="h5">{oneCard.title}</CardTitle>
        <CardText>{oneCard.body}</CardText>
        <Row>
          <Button color="danger" onClick={() => deleteHandler(oneCard.id)}>Удалить</Button>
          <Button color="primary" onClick={toggleModal}>Редактировать</Button>
        </Row>
      </CardBody>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Редактирование</ModalHeader>
        <ModalBody>
          <form>
            <Input
              className="mt-2"
              placeholder="Название"
              name="title"
              value={editedPost.title}
              onChange={handleInputChange}
            />
            <Input
              className="mt-4"
              placeholder="Описание"
              name="body"
              value={editedPost.body}
              onChange={handleInputChange}
            />
            <Input
              className="mt-4"
              placeholder="Город"
              name="city"
              value={editedPost.city}
              onChange={handleInputChange}
            />
            <Input
              className="mt-4"
              placeholder="Стоимость"
              name="price"
              value={editedPost.price}
              onChange={handleInputChange}
            />
            <Button className="w-100 mt-4" color="primary" onClick={saveChanges}>
              Сохранить
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </Card>
  );
}
