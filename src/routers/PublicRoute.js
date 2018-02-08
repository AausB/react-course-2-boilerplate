import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// named export for the un-connected component
export const PublicRoute = ({
  isAuthenticated,
  component: Component, // rename component to Component
  ...rest // rest parameter syntax: a parameter 'rest' for the rest of the parameters which were not destructered; it's an array of arguments
}) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <Redirect to="/dashboard" />
    ) : (
      <Component {...props} />
    )
  )}/>
);

// get the authentication uid from the state
const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid // turn it into a real boolean value
});

// default export for the connected component
export default connect(mapStateToProps)(PublicRoute);