import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { addItemThunk } from '../../Redux/slice/itemSlice';
// import MultirInput from './MultirInput';
import PhotoUploadForm from './MultirInput'; // Импортируем компонент PhotoUploadForm
import { closeModal, handleModal, openModal } from '../../Redux/slice/modalSlice';
import { getUserItemThunk } from '../../Redux/slice/userItemSlice';

export default function LkMainPage() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    city: '',
    category_id: '',
  });
  const [showPhotoUpload, setShowPhotoUpload] = useState(false); // Состояние для отображения инпута на добавление фото
  const [itemAdded, setItemAdded] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handlereversModal = () => {
    setShowPhotoUpload(!showPhotoUpload);
  };

  const allCategory = useAppSelector((store) => store.item.allProduct);

  const addHandler: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    if (formData.title && formData.body && formData.city && formData.category_id) {
      dispatch(addItemThunk(formData));
      setFormData({
        title: '',
        body: '',
        city: '',
        category_id: '',
      });
      setItemAdded(true);
      setShowPhotoUpload(true); // Показываем инпут на добавление фото после успешного добавления
    }
  };

  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const itemId = useAppSelector((state) => state.modal.itemId);

  return (
    <>
      {isOpen && (
        <div>
          <Modal isOpen={isOpen} toggle={handleCloseModal}>
            <ModalHeader toggle={handleCloseModal}>Добавить товар</ModalHeader>
            <ModalBody>
              {showPhotoUpload ? ( // Показываем инпут на добавление фото, если showPhotoUpload равно true
                <>
                  <PhotoUploadForm itemId={itemId} />
                  <Button color="secondary" onClick={handlereversModal}>
                    Назад
                  </Button>
                </>
              ) : (
                <form onSubmit={addHandler} id="modalForm">
                  <Input
                    placeholder="Название"
                    name="title"
                    style={{ marginBottom: 10 }}
                    value={formData.title}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="Описание"
                    name="body"
                    style={{ marginBottom: 10 }}
                    value={formData.body}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="Город"
                    name="city"
                    style={{ marginBottom: 10 }}
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <Input
                    name="category_id"
                    type="select"
                    style={{ marginBottom: 10 }}
                    value={formData.category_id}
                    onChange={handleChange}
                  >
                    <option value="" hidden>
                      Категория
                    </option>
                    {allCategory.slice(1).map((category) => (
                      <option value={category.id} key={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Input>
                </form>
              )}
            </ModalBody>
            <ModalFooter>
              {showPhotoUpload ? null : ( // Скрыть кнопку "Добавить" при открытом инпуте на добавление фото
                <Button
                  color={
                    formData.title && formData.body && formData.city && formData.category_id
                      ? 'primary'
                      : 'danger'
                  }
                  onClick={addHandler}
                >
                  Добавить
                </Button>
              )}

              <Button color="secondary" onClick={handleCloseModal}>
                Закрыть
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}
    </>
  );
}
