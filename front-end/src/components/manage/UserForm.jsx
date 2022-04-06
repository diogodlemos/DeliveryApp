import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PASSWORD_MIN_LEN, NAME_MIN_LEN } from '../../constants/login';

import { createUser } from '../../api/admin';
import { useUserContext } from '../../context/UserContext';

function UserForm({ setErrorMessage }) {
  const userInit = {
    name: '',
    email: '',
    password: '',
    role: '',
  };

  const [user, setUser] = useState(userInit);
  const { token } = useUserContext();

  const validateEntries = useCallback(({ name, password, email, role }) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const emailValid = emailRegex.test(email);
    const passwordValid = password.length >= PASSWORD_MIN_LEN;
    const nameValid = name.length >= NAME_MIN_LEN;
    const roleValid = role !== '';

    if (emailValid && passwordValid && nameValid && roleValid) {
      return false;
    }

    return true;
  }, []);

  const isInputInvalid = useMemo(() => (
    validateEntries(user)
  ), [user, validateEntries]);

  function handleChangeUser({ target }) {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  }

  const handleCreateUser = async (evt) => {
    evt.preventDefault();

    const data = await createUser(token, user);

    const { message } = data;

    if (message) {
      setErrorMessage(message);
    }
    setUser(userInit);
  };

  return (
    <div className="container-form">
      <h3>Cadastrar novo usuário</h3>
      <form onSubmit={ handleCreateUser } className="manage-form">
        <label htmlFor="input-name">
          Nome
          <input
            type="text"
            className="manage-input"
            id="input-name"
            name="name"
            value={ user.name }
            onChange={ handleChangeUser }
            placeholder="Nome e sobrenome"
            data-testid="admin_manage__input-name"
          />
        </label>
        <label htmlFor="input-email">
          Email
          <input
            type="text"
            className="manage-input"
            id="input-email"
            name="email"
            value={ user.email }
            placeholder="seu-email@site.com.br"
            onChange={ handleChangeUser }
            data-testid="admin_manage__input-email"
          />
        </label>
        <label htmlFor="input-password">
          Senha
          <input
            type="password"
            id="input-password"
            name="password"
            className="manage-input"
            value={ user.password }
            autoComplete="off"
            placeholder="*********"
            onChange={ handleChangeUser }
            data-testid="admin_manage__input-password"
          />
        </label>
        <label htmlFor="select-role">
          Tipo
          <select
            id="select-role"
            name="role"
            value={ user.role }
            onChange={ handleChangeUser }
            data-testid="admin_manage__select-role"
          >
            <option value={ userInit.role }>
              { userInit.role }
              {' '}
            </option>
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <button
          id="button"
          type="submit"
          className="manage-button"
          data-testid="admin_manage__button-register"
          disabled={ isInputInvalid }
        >
          CADASTRAR
        </button>
      </form>
    </div>
  );
}

export default UserForm;

UserForm.propTypes = {
  setErrorMessage: PropTypes.func.isRequired,
};
