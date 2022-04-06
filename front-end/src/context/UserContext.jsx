import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export function UserContextWrapper({ children }) {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    if (token !== '') return;
    const localUser = localStorage.getItem('user');
    if (!localUser) return;
    const parsedLocalUser = JSON.parse(localUser);
    setToken(parsedLocalUser.token);
    setUser(parsedLocalUser);
  }, [token]);

  return (
    <UserContext.Provider value={ { token, setToken, user, setUser } }>
      {children}
    </UserContext.Provider>
  );
}

UserContextWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export function useUserContext() {
  return useContext(UserContext);
}
