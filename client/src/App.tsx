import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './Components/UI/NavBar';
import MainPage from './Components/MainPage';



function App(): JSX.Element {

  return (<>
     <Navbar />
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes></>
  );
}

export default App;
