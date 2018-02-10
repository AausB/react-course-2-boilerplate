import { firebase, googleAuthProvider } from '../firebase/firebase';

// is called from app.js: firebase.auth().onAuthStateChanged()
export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

// is called from app.js: firebase.auth().onAuthStateChanged()
export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider); // returns a promise
  };
};

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
