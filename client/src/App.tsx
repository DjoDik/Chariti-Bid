import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/UI/NavBar';
import MainPage from './Components/MainPage';
import { Col, Container, Row } from 'reactstrap';
import AuthPage from './Auth/AuthPage';
import SideBarAucTop from './Components/UI/sideBarAucTop';
import UserItemsPage from './Components/LK/UserItemsPage';
import LkMainPage from './Components/LK/LkMainPage';
import Basket from './Components/LK/Basket'

function App(): JSX.Element {
 
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
            <Route path='/useritem/:id' element={<UserItemsPage/>}/>
            <Route path="/cabinet" element={<LkMainPage />} />
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
