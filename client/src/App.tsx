import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/UI/NavBar';
import MainPage from './Components/MainPage';
import { Col, Container, Row } from 'reactstrap';
import AuthPage from './Auth/AuthPage';
import SideBarAucTop from './Components/UI/sideBarAucTop';
import PhotoUploader from './Components/Item/avatarPage';
import UserItemsPage from './Components/LK/UserItemsPage';
import UserProfilePage from './Components/LK/UserProfilePage';
import Basket from './Components/LK/Basket';
import { useAppDispatch, useAppSelector } from './Components/Redux/hooks';
import { checkUserThunk } from './Components/Redux/slice/userSlice';
import { SOCKET_INIT } from './Components/types/wsTypes';

function App(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user.id) {
      dispatch({ type: SOCKET_INIT });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);
  return (
    <Container fluid>
      <Row>
        <Col>
          <Navbar />
        </Col>
      </Row>
      <Row>
        <Col xs="10">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:auth" element={<AuthPage />} />
            <Route path="/" element={<PhotoUploader />} />
            <Route path="/useritem/:id" element={<UserItemsPage />} />
            <Route path="/userprofile" element={<UserProfilePage />} />
            <Route path="/cabinet/basket" element={<Basket />} />
          </Routes>
        </Col>
        <Col xs="2">
          <SideBarAucTop />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
