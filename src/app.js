import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// use the history from AppRouter to redirect outside of a React Component
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';

import {firebase} from './firebase/firebase';

const store = configureStore();

// console.log('Test: devtools console');

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;

// only render app if it is not rendered yet
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
}

console.log('NODE_ENV:', process.env.NODE_ENV);

// show to screen until expenses are loaded from database
ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// when the app loads AND when the auth state changes
// listen to the login/logout event
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('log in');
    
    store.dispatch(login(user.uid));  // simple action creator function

    renderApp();

    // only redirect to /dashboard if user is on login screen === '/'
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }

  } else {
    console.log('log out');

    store.dispatch(logout()); // simple action creator function
    renderApp();
    history.push('/');
  }
});
