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
import { SOCKET_INIT, UPDATE_PRICE } from './Components/types/wsTypes';
import ProtectedRoute from './hoc/ProtectedRoute';
import { TimerStateSlice } from './Components/types/TimerType';
import axios from 'axios';
function App(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const handleBid = (id: number, countBid: number, userId:number) => {
    dispatch({ type: UPDATE_PRICE, payload: { id, countBid,userId } });
    const currentTime = new Date().getTime() / 1000
    axios.post<TimerStateSlice>('/api/timer', {item_id: id, value: currentTime})
  };
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
            <Route path="/" element={<MainPage handleBid={handleBid}  />} />
            <Route path="/:auth" element={<AuthPage />} />
            <Route path="/" element={<PhotoUploader />} />
            <Route element={<ProtectedRoute redirect="/" isAllowed={user.status} />}>
              <Route path="/useritem/:id" element={<UserItemsPage />} />
              <Route path="/userprofile" element={<UserProfilePage />} />
              <Route path="/basket/:id" element={<Basket />} />
            </Route>
          </Routes>
        </Col>
        <Col xs="2">
          <SideBarAucTop handleBid={handleBid}/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
