import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
// import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'; // create own browser history

import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// export history to use it in other files
export const history = createHistory();


const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);


export default AppRouter;
