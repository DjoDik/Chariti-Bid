import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './redux/hooks';

import Navbar from './Components/UI/NavBar';
import MainPage from './Components/MainPage';
import ProtectedRoute from './hoc/ProtectedRoute';
import AuthPage from './Auth/AuthPage';

function App(): JSX.Element {
  const user = useAppSelector((state) => state.user);

  return (
    <>
      <Navbar />
      {!user.status ? (
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/:auth"
            element={
              <ProtectedRoute redirect="/" isAllowed={!user.id}>
                <AuthPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      ) : null}
    </>
  );
}

export default App;
