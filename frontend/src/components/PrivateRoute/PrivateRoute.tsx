import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';

// { component: Component, ...rest }
const PrivateRoute = (props: any) => {
  const { component: Component, ...rest } = props;
  const isLoggedIn = false;
  // const { isLoggedIn } = useContext(UserContext);
  return <Route {...rest} render={(props) => (isLoggedIn ? <Component {...props} /> : <Redirect to="/auth" />)} />;
};
export default PrivateRoute;
