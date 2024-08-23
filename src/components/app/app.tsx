// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';
import { IngredientDetails } from '../ingredient-details';
import {
  ConstructorPage,
  Feed,
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '../../pages/';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchIngredientsThunk } from '../../slices/ingedientSlice';
import { AppHeader } from '../app-header'; // Импортируйте AppHeader

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchIngredientsThunk());
  }, [dispatch]);

  return (
    <Router>
      <AppHeader /> {/* Разместите хедер перед Routes */}
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/profile'
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<PrivateRoute element={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:id'
          element={
            <Modal title='OrderInfo' onClose={() => {}}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='IngredientDetails' onClose={() => {}}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:id'
          element={
            <Modal title='OrderInfo' onClose={() => {}}>
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
