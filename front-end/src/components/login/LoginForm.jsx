import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import '../../styles/login.css';
import { PASSWORD_MIN_LEN } from '../../constants/login';
import { login } from '../../api/login';
import { useUserContext } from '../../context/UserContext';

function LoginForm({ setErrorMessage }) {
  const loginInit = {
    email: '',
    password: '',
  };

  const [loginUser, setLoginUser] = useState(loginInit);
  const { setToken, setUser } = useUserContext();
  const history = useHistory();

  const validateEntries = (email, password) => {
    const emailRegex = /\S+@\S+\.\S+/;

    if (emailRegex.test(email) && password.length >= PASSWORD_MIN_LEN) {
      return false;
    }

    return true;
  };

  const isInputInvalid = useMemo(() => (
    validateEntries(loginUser.email, loginUser.password)
  ), [loginUser]);

  function handleChangeLogin({ target }) {
    setLoginUser({
      ...loginUser,
      [target.name]: target.value,
    });
  }

  const redirectPageByRole = (role) => {
    const page = {
      customer: '/customer/products',
      seller: '/seller/orders',
      administrator: '/admin/manage',
    };
    return history.push(page[role]);
  };

  const handleLogin = async (evt) => {
    evt.preventDefault();

    const data = await login(loginUser);

    if (data.token) {
      setToken(data.token);
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      redirectPageByRole(data.role);
      return;
    }

    const { message } = data;
    setErrorMessage(message);
    setLoginUser(loginInit);
  };

  const handleRegister = (evt) => {
    evt.preventDefault();
    history.push('/register');
  };

  return (
    <form onSubmit={ handleLogin } className="login-form">
      <p>Login</p>
      <input
        type="text"
        className="login-input"
        name="email"
        value={ loginUser.email }
        onChange={ handleChangeLogin }
        placeholder="Email"
        data-testid="common_login__input-email"
      />
      <p>Senha</p>
      <input
        type="password"
        className="login-input"
        name="password"
        value={ loginUser.password }
        autoComplete="off"
        placeholder="Senha"
        onChange={ handleChangeLogin }
        data-testid="common_login__input-password"
      />
      <button
        type="submit"
        className="login-button"
        data-testid="common_login__button-login"
        disabled={ isInputInvalid }
      >
        LOGIN
      </button>
      <button
        type="button"
        onClick={ handleRegister }
        className="create-button"
        data-testid="common_login__button-register"
      >
        Ainda não tenho a conta
      </button>
    </form>
  );
}

export default LoginForm;

LoginForm.propTypes = {
  setErrorMessage: PropTypes.func.isRequired,
};
