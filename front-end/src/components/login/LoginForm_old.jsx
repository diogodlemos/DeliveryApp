import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import '../../styles/login.css';
import { PASSWORD_MIN_LEN } from '../../constants/login';
import { login } from '../../api/login';
import { useUserContext } from '../../context/UserContext';

function LoginForm({ setErrorMessage }) {
  const [loginUser, setLoginUser] = useState('');
  const [password, setPassword] = useState('');
  const [isInputInvalid, setInputInvalid] = useState(true);
  const { setToken, setUser } = useUserContext();
  const history = useHistory();

  useEffect(() => {
    if (password.length < PASSWORD_MIN_LEN) return;
    const emailRegex = /\S+@\S+\.\S+/;
    console.log(emailRegex.test(loginUser));
    if (!emailRegex.test(loginUser)) return;
    setInputInvalid(false);
  }, [loginUser, password]);

  const handleLogin = async (evt) => {
    evt.preventDefault();
    try {
      const response = await login(loginUser, password);
      const user = response.data;
      setToken(response.data.token);
      setUser(response.data);
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: user.name,
          email: user.email,
          role: user.role,
          token: user.token,
        }),
      );
      if (user.role === 'customer') return history.push('/customer/products');
      if (user.role === 'seller') return history.push('/seller/orders');
    } catch (err) {
      const { message } = err.response.data;
      setErrorMessage(message);
    }
  };

  const handleRegister = (evt) => {
    evt.preventDefault();
    history.push('/register');
  };

  return (
    <form className="login-form">
      <p>Login</p>
      <input
        type="text"
        className="login-input"
        value={ loginUser }
        onChange={ (evt) => setLoginUser(evt.target.value) }
        placeholder="Email"
        data-testid="common_login__input-email"
      />
      <p>Senha</p>
      <input
        type="password"
        className="login-input"
        value={ password }
        placeholder="Senha"
        onChange={ (evt) => setPassword(evt.target.value) }
        data-testid="common_login__input-password"
      />
      <button
        type="submit"
        onClick={ handleLogin }
        className="login-button"
        disabled={ isInputInvalid }
        data-testid="common_login__button-login"
      >
        LOGIN
      </button>
      <button
        type="submit"
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
