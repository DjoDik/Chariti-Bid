import React, { useState } from 'react';
import LeftSideMenu from './UI/LeftSideMenu';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { margin } from '@mui/system';
import { Form } from 'react-router-dom';
export default function LkMainPage() {
  const [modal, setModal] = useState(false);

  const toggle = ():void => setModal(!modal);
  return (
    <>
      <Row xs="5">
        <LeftSideMenu toggle={toggle}/>
      </Row>

      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <form>
              <Input placeholder='Название' name='title'/>
              <Input placeholder='Описание'name='bode'/>
              <Input placeholder='Город' name='city'/>
              {/* <Input placeholder='Город' name='city'/>  мультир*/}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
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
