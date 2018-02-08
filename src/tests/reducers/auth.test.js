import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
  const uid = 'testuid';
  const action = {
    type: 'LOGIN',
    uid
  };

  const state = authReducer(undefined, action);

  expect(state.uid).toEqual(uid);
});

test('should clear uid for logout', () => {
  const action = {
    type: 'LOGIN'
  };

  const state = authReducer({uid: 'Should Be Cleared'}, action);

  expect(state).toEqual({});
});