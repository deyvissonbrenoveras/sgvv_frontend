import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';
import DashboardLayout from '../pages/layouts/dashboardLayout';
import AuthLayout from '../pages/layouts/authLayout';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const signed = useSelector((state) => state.auth.signed);
  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }
  if (signed && !isPrivate) {
    return <Redirect to="/painel" />;
  }
  const Layout = signed ? DashboardLayout : AuthLayout;
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}
RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
