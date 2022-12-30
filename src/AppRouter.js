import { Home, Levers } from 'container';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

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
      <Routes>
        <Route path='/' element={<HomeComponents />} />
      </Routes>
    </div>
  );
}

export default AppRouter;
