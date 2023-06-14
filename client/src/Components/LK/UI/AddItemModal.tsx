import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
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
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [isItemAdded, setIsItemAdded] = useState(false);
  const modalRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handlereversModal = () => {
    setShowPhotoUpload(!showPhotoUpload);
  };

  const addHandler = (e) => {
    e.preventDefault();
    if (formData.title && formData.body && formData.city && formData.category_id) {
      dispatch(addItemThunk(formData));
      setFormData({
        title: '',
        body: '',
        city: '',
        category_id: '',
      });
      setIsItemAdded(true);
      setShowPhotoUpload(true);
    }
  };

  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const itemId = useAppSelector((state) => state.modal.itemId);
  const allCategory = useAppSelector((store) => store.item.allProduct);

  useEffect(() => {
    if (isItemAdded && !showPhotoUpload) {
      dispatch(closeModal());
      setIsItemAdded(false);
    }
  }, [isItemAdded, showPhotoUpload, dispatch]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowPhotoUpload(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <div>
          <Modal isOpen={isOpen} toggle={handleCloseModal}>
            <ModalHeader toggle={handleCloseModal}>Добавить товар</ModalHeader>
            <ModalBody>
              {showPhotoUpload ? (
                <div ref={modalRef}>
                  <PhotoUploadForm itemId={itemId} />
                  <Button color="secondary" onClick={handlereversModal}>
                    Закрыть
                  </Button>
                </div>
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
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Input>
                </form>
              )}
            </ModalBody>
            <ModalFooter>
              {showPhotoUpload ? null : (
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
            </ModalFooter>
          </Modal>
        </div>
      )}
    </>
  );
}
