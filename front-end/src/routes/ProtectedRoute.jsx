import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const { user } = useUserContext();
  // const localUser = localStorage.getItem('user');
  // const parsedLocalUser = JSON.parse(localUser) || {};

  return (
    <Route
      { ...restOfProps }
      render={ (props) => {
        if (user.token !== '') return <Component { ...props } />;
        return <Redirect to="/login" />;
      } }
    />
  );
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
