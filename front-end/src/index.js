import ReactDOM from 'react-dom';
import React from 'react';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ProductContextWrapper } from './context/ProductsContext';
import { UserContextWrapper } from './context/UserContext';
import Routes from './routes/Routes';

ReactDOM.render(
  <React.StrictMode>
    <UserContextWrapper>
      <ProductContextWrapper>
        <Routes />
      </ProductContextWrapper>
    </UserContextWrapper>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
