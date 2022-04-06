import React from 'react';
import { VscError } from 'react-icons/vsc';
import PropTypes from 'prop-types';

function ErrorModal({ errorMessage, setErrorMessage, testId }) {
  const show = errorMessage === '' ? 'none' : 'flex';
  return (
    <div style={ { display: show } } className="login-modal">
      <div className="login-error-container">
        <VscError className="login-error-circle" />
        <h3>Erro</h3>
        <p data-testid={ testId }>{errorMessage}</p>
        <button
          type="button"
          className="login-error-button"
          onClick={ () => setErrorMessage('') }
        >
          Ok
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;

ErrorModal.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
};
