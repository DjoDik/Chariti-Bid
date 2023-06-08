import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './Components/MainPage';

function App(): JSX.Element {

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

export default App;
