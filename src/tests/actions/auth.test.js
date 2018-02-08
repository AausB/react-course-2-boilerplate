import {login, logout} from '../../actions/auth';

test('should create a login action object', () => {
  const uid = 'uidtest';
  const action = login(uid);

  expect(action).toEqual({
    type: 'LOGIN',
    uid
  });
});

test('should create a logout action object', () => {
  const action = logout();

  expect(action).toEqual({
    type: 'LOGOUT'
  });
});
