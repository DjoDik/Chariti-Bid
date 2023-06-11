import React, { useState } from 'react';
import LeftSideMenu from './UI/LeftSideMenu';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { addItemThunk } from '../Redux/slice/itemSlice';
import MultirInput from './UI/MultirInput';

export default function LkMainPage() {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    city: '',
    category_id: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const allCategory = useAppSelector((store) => store.item.allProduct);

  const toggle = () => setModal(!modal);

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
      toggle(); 
    } 
  };

  
  return (
    <>
      <Row xs="5">
        <LeftSideMenu toggle={toggle} />
      </Row>

      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Добавить товар</ModalHeader>
          <ModalBody>
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
              <MultirInput />
              {/* <Input placeholder='Фото' name='foto'/>  мультир*/}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              color={
                formData.title && formData.body && formData.city && formData.category_id
                  ? 'primary'
                  : 'danger'
              }
              onClick={addHandler}
            >
              Добавить
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Закрыть
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}
