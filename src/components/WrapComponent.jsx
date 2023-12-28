import React from 'react';
import HeaderComponent from './wrap/HeaderComponent';
import TopModalComponent from './wrap/TopModalComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeComponent from './wrap/HomeComponent';


function WrapComponent() {
  return (
    <div id='wrap'>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <TopModalComponent />
        <HeaderComponent />
        <Routes>
            <Route path='/' element={<HomeComponent/>}>
            </Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
};

export default WrapComponent;