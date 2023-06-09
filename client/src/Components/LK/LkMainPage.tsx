import React, { useState } from 'react';
import LeftSideMenu from './UI/LeftSideMenu';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { itemFormType } from '../types/itemType';

export default function LkMainPage() {
  const [modal, setModal] = useState(false);
  const dispatch = useAppDispatch();

  const allCategory = useAppSelector((store) => store.item.allProduct);

  const toggle = (): void => setModal(!modal);

  const addHandler: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    dispatch(addPostThunk(Object.fromEntries(new FormData(e.currentTarget)) as itemFormType));
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
            <form>
              <Input placeholder="Название" name="title" style={{ marginBottom: 10 }} />
              <Input placeholder="Описание" name="body" style={{ marginBottom: 10 }} />
              <Input placeholder="Город" name="city" style={{ marginBottom: 10 }} />
              <Input  name="category_id" type="select">
                <option value="" hidden>
                  Категория
                </option>
                {allCategory.map((category) => (
                  <option value="option1">{category.name}</option>
                ))}
              </Input>
              {/* <Input placeholder='Фото' name='foto'/>  мультир*/}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" onClick={addHandler}>
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
function addPostThunk(arg0: itemFormType): any {
  throw new Error('Function not implemented.');
}
