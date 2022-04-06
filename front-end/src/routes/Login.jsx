import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorModal from '../components/common/ErrorModal';
import LoginForm from '../components/login/LoginForm';
import { useUserContext } from '../context/UserContext';

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const { token } = useUserContext();
  const history = useHistory();

  useEffect(() => {
    if (token !== '') {
      history.push('/customer/products');
    }
  }, [history, token]);

  return (
    <div className="login-page">
      <p>Logotipo</p>
      <p>Nome</p>
      <LoginForm setErrorMessage={ setErrorMessage } />
      <ErrorModal
        errorMessage={ errorMessage }
        setErrorMessage={ setErrorMessage }
        testId="common_login__element-invalid-email"
      />
    </div>
  );
}

export default Login;
