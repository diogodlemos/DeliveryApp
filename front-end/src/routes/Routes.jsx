import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CustomerAllOrders from './CustomerAllOrders';
import CustomerOrders from './CustomerOrders';
import Login from './Login';
import Products from './Products';
import ProductsCheckout from './ProductsCheckout';
import Register from './Register';
import SellerOrder from './SellerOrder';
import SellerOrders from './SellerOrders';
import AdminManage from './AdminManage';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/checkout" component={ ProductsCheckout } />
        <Route exact path="/customer/orders/" component={ CustomerAllOrders } />
        <Route exact path="/customer/orders/:id" component={ CustomerOrders } />
        <Route exact path="/seller/orders" component={ SellerOrders } />
        <Route exact path="/seller/orders/:id" component={ SellerOrder } />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/admin/manage" component={ AdminManage } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
