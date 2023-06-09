import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import Navbar from './Components/UI/NavBar';
import MainPage from './Components/MainPage';
import { Col, Container, Row } from 'reactstrap';
import AuthPage from './Auth/AuthPage';
import SideBarCategory from './Components/UI/sideBarCategory';
import SideBarAucTop from './Components/UI/sideBarAucTop';
import LkMainPage from './Components/LK/LkMainPage';

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
            <Route path="/cabinet" element={<LkMainPage />} />
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
