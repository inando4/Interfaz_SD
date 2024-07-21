import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const PrivateRoute = ({ roles, element: Component, ...rest }) => {
  const { keycloak } = useKeycloak();

  const isAuthorized = () => {
    if (!keycloak.authenticated) {
      return false;
    }

    if (roles && roles.length > 0) {
      return roles.some(role => keycloak.hasRealmRole(role));
    }

    return true;
  };

  return (
    <Route
      {...rest}
      element={isAuthorized() ? <Component /> : <Navigate to="/" />}
    />
  );
};

export default PrivateRoute;