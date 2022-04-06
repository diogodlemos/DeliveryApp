import React, { useState } from 'react';
import ErrorModal from '../components/common/ErrorModal';
import RegisterForm from '../components/register/RegisterForm';

function Register() {
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <div className="login-page">
      <p>Nome</p>
      <RegisterForm setErrorMessage={ setErrorMessage } />
      <ErrorModal
        errorMessage={ errorMessage }
        setErrorMessage={ setErrorMessage }
        testId="common_register__element-invalid_register"
      />
    </div>
  );
}

export default Register;
