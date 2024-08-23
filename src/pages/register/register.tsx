import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      // Очистка предыдущих ошибок
      setErrorText('');

      // Вызов функции регистрации из API
      await registerUser({ email, name: userName, password });

      // Перенаправление на другую страницу (например, на страницу входа) после успешной регистрации
      // Например, с использованием useNavigate из react-router-dom
      useNavigate();
    } catch (error) {
      // Обработка ошибки и установка текста ошибки в состояние
      setErrorText('Ошибка регистрации. Попробуйте еще раз.');
      console.error('Ошибка регистрации:', error);
    }
  };
  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
