import { Container } from '@mui/material';
import React, { useState } from 'react';
import { Button, Card, CardBody, CardImg, CardTitle, Input, Modal, ModalBody } from 'reactstrap';
import { useAppSelector, useAppDispatch } from '../Redux/hooks';
import { changePassword, changePasswordThunk } from '../Redux/slice/userSlice';

export default function UserProfilePage(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const [userName, setUsername] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [email, setEmail] = useState('');

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleChangePassword = () => {
    dispatch(changePasswordThunk({ email, oldPassword, newPassword, userName }));
    setModalOpen(false);
  };

  return (
    <Container className="mt-5">
      <Card>
        <CardImg
          className="align-self-center"
          style={{
            width: '50%',
            margin: '10px',
          }}
          src={user.avatar}
          alt="Avatar"
        />
        <CardBody className="text-center">
          <CardTitle>Имя профиля: {userName || user.username}</CardTitle>
          <CardTitle>Email: *********</CardTitle>
          <CardTitle>Пароль: *********</CardTitle>
          <Button className="mt-5" onClick={toggleModal}>
            Изменить
          </Button>
        </CardBody>
      </Card>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalBody>
          <h3>Изменение пароля</h3>
          <Input
            className="mt-2"
            type="text"
            placeholder="Логин"
            value={userName || user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            className="mt-2"
            type="password"
            placeholder="Старый пароль"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input
            className="mt-2"
            type="password"
            placeholder="Новый пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            className="mt-2"
            type="email"
            placeholder="Подтверждение Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="mt-2" onClick={handleChangePassword}>
            Сохранить
          </Button>
        </ModalBody>
      </Modal>
    </Container>
  );
}
