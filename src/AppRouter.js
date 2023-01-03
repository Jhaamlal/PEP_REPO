import { FormComponent, Home, Levers } from 'container';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const HomeComponents = () => {
  return (
    <div className='tw-bg-slate-300 tw-h-screen'>
      <Home />
      <Levers />
    </div>
  );
};
function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeComponents />} />
          <Route path='/form' element={<FormComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
