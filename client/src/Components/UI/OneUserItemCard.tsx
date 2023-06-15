import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  CardText,
} from 'reactstrap';
import { ItemType, FotoType } from '../types/itemType';
import { deleteThunk, editThunk } from '../Redux/slice/userItemSlice';
import { useAppDispatch } from '../Redux/hooks';
import PhotoUploadForm from '../LK/UI/MultirInput';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';
import { deletePhoto, getDeletePhotoThunk } from '../Redux/slice/photoSlice'; // Добавлен импорт действия для удаления фотографии

type PropsType = {
  oneCard: ItemType;
};

export default function OneUserItemCard({ oneCard }: PropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editedPost, setEditedPost] = useState<FotoType>({
    id: oneCard.id,
    title: oneCard.title,
    body: oneCard.body,
    city: oneCard.city,
    FotoGaleries: oneCard.FotoGaleries,
  });
  const userItems = useSelector((state: RootState) => state.userItem.userItems);
  const editedPosts = userItems.find((item) => item.id === oneCard.id);
  const [editedPhotos, setEditedPhotos] = useState<FotoType[]>(oneCard.FotoGaleries);

  const deleteHandler = (id: string) => {
    dispatch(deleteThunk(id));
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'deletePhoto') {
      const photoIndex = parseInt(value, 10);
      const updatedPhotos = editedPhotos.filter((_, index) => index !== photoIndex);
      setEditedPhotos(updatedPhotos);
    } else {
      setEditedPost((prevPost) => ({
        ...prevPost,
        [name]: value,
      }));
    }
  };

  const saveChanges = () => {
    dispatch(editThunk(editedPost));
    toggleModal();
  };

  const deletePhotoHandler = (photoId: string) => {
    dispatch(getDeletePhotoThunk(photoId));
    const updatedPhotos = editedPhotos.filter((photo) => photo.id !== photoId);
    setEditedPhotos(updatedPhotos);
  };
  console.log({ oneCard });
  return (
    <Card
      style={{
        width: '13rem',
        margin: '10px',
        border: '0px solid white',
      }}
    >
      {oneCard.FotoGaleries && oneCard.FotoGaleries.length > 0 ? (
        <img alt="Sample" src={`http://localhost:3001/photo/${oneCard.FotoGaleries[0].img}`} />
      ) : (
        <div>No Image</div>
      )}
      <CardBody>
        <CardTitle tag="h5">{oneCard.title}</CardTitle>
        <CardText>{oneCard.body}</CardText>
        <Row>
          <Button color="danger" onClick={() => deleteHandler(oneCard.id)}>
            Удалить
          </Button>
          <Button color="primary" onClick={toggleModal}>
            Редактировать
          </Button>
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

            <div style={{ display: 'flex' }}>
              {editedPhotos?.map((photo) => (
                <div key={photo.id} style={{ position: 'relative', marginRight: '10px' }}>
                  <img
                    alt="Sample"
                    src={`http://localhost:3001/photo/${photo.img}`}
                    style={{ width: '100px', height: '100px' }}
                  />
                  <Button
                    color="danger"
                    onClick={() => deletePhotoHandler(photo.id)}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      padding: '0',
                      width: '20px',
                      height: '20px',
                      lineHeight: '20px',
                      fontSize: '14px',
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    &times;
                  </Button>
                </div>
              ))}
            </div>

            <PhotoUploadForm itemId={editedPost.id} existingPhotos={editedPhotos} />
            <Button className="w-100 mt-4" color="primary" onClick={saveChanges}>
              Сохранить
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </Card>
  );
}
