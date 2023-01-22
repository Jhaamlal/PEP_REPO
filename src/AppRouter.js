import { FormComponent, HomeComponents } from 'container';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'Store';

function AppRouter() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeComponents />} />
          <Route path='/form' element={<FormComponent />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default AppRouter;
