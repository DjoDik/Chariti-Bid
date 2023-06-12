import React, { useState, useEffect } from 'react';
import { Avatar, Container } from '@mui/material';
import { Button, Card, CardBody, CardTitle, Input, Modal, ModalBody } from 'reactstrap';
import { useAppSelector, useAppDispatch } from '../Redux/hooks';
import { changePasswordThunk } from '../Redux/slice/userSlice';
import PhotoUploader from '../../Components/Item/avatarPage';

export default function UserProfilePage(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const [userName, setUsername] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (user.avatar) {
      setAvatar(`http://localhost:3001/${user.avatar}`);
    }
  }, [user.avatar]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleChangePassword = () => {
    dispatch(changePasswordThunk({ email, oldPassword, newPassword, userName, newPhone }));
    setModalOpen(false);
  };

  const handleOpenAvatarModal = () => {
    setModalOpen(true);
  };

  const handleOpenDataModal = () => {
    setModalOpen(true);
  };

  return (
    <Container className="mt-5">
      <Card>
        <CardBody className="text-center">
          <div className="d-flex justify-content-center align-items-center">
            <Avatar
              alt="User Avatar"
              src={avatar}
              sx={{
                width: 140,
                height: 140,
                transition: 'all 0.3s',
              }}
            />
            <Button className="mt-5" onClick={handleOpenAvatarModal}>
              Изменить аватар
            </Button>
          </div>
          <CardTitle>Имя профиля: {userName || user.username}</CardTitle>
          <CardTitle>Email: *********</CardTitle>
          <CardTitle>Пароль: *********</CardTitle>
          <Button className="mt-5" onClick={handleOpenDataModal}>
            Изменить
          </Button>
        </CardBody>
      </Card>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalBody>
          {modalOpen && <PhotoUploader />}
          {!modalOpen && (
            <>
              <h3>Изменение данных</h3>
              <Input
                className="mt-2"
                type="text"
                placeholder="Логин"
                value={userName || user.username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                className="mt-2"
                type="text"
                placeholder="Номер телефона"
                value={newPhone || user.phone}
                onChange={(e) => setNewPhone(e.target.value)}
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
            </>
          )}
        </ModalBody>
      </Modal>
    </Container>
  );
}
