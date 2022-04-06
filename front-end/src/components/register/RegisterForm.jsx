import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { NAME_MIN_LEN, PASSWORD_MIN_LEN } from '../../constants/login';
import { create } from '../../api/login';
import { useUserContext } from '../../context/UserContext';

function RegisterForm({ setErrorMessage }) {
  const [name, setName] = useState('');
  const [loginUser, setLoginUser] = useState('');
  const [password, setPassword] = useState('');
  const [isInputInvalid, setInputInvalid] = useState(true);
  const { setToken, setUser } = useUserContext();
  const history = useHistory();

  useEffect(() => {
    if (name.length < NAME_MIN_LEN) return setInputInvalid(true);
    if (password.length < PASSWORD_MIN_LEN) return setInputInvalid(true);
    const emailRegex = /\S+@\S+\.\S+/;
    console.log(emailRegex.test(loginUser));
    if (!emailRegex.test(loginUser)) return setInputInvalid(true);
    setInputInvalid(false);
  }, [name, loginUser, password]);

  const handleRegister = async (evt) => {
    evt.preventDefault();
    try {
      const response = await create(name, loginUser, password);
      const { token, ...dbUser } = response.data;
      console.log(response);
      setUser(dbUser);
      setToken(token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: dbUser.name,
          email: dbUser.email,
          role: dbUser.role,
          token,
        }),
      );
      history.push('/customer/products');
    } catch (err) {
      const { message } = err.response.data;
      setErrorMessage(message);
    }
  };

  return (
    <form className="login-form">
      <p className="login-form-label">Nome</p>
      <input
        type="text"
        className="login-input"
        value={ name }
        onChange={ (evt) => setName(evt.target.value) }
        placeholder="Seu nome"
        data-testid="common_register__input-name"
      />
      <p className="login-form-label">Login</p>
      <input
        type="text"
        className="login-input"
        value={ loginUser }
        onChange={ (evt) => setLoginUser(evt.target.value) }
        placeholder="Email"
        data-testid="common_register__input-email"
      />
      <p className="login-form-label">Senha</p>
      <input
        type="password"
        className="login-input"
        value={ password }
        placeholder="Senha"
        onChange={ (evt) => setPassword(evt.target.value) }
        data-testid="common_register__input-password"
      />
      <button
        type="submit"
        onClick={ handleRegister }
        className="login-button"
        data-testid="common_register__button-register"
        disabled={ isInputInvalid }
      >
        CADASTRAR
      </button>
    </form>
  );
}

export default RegisterForm;

RegisterForm.propTypes = {
  setErrorMessage: PropTypes.func.isRequired,
};
