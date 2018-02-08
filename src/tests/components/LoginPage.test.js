import React from 'react';
import {shallow} from 'enzyme';

import {LoginPage} from '../../components/LoginPage';

test('should render LoginPage correctly', () => {
  const wrapper = shallow(<LoginPage />);

  expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
  const startLoginSpy = jest.fn(); // define spy function
  const wrapper = shallow(<LoginPage startLogin={startLoginSpy} />);

  wrapper.find('button').simulate('click'); // simulate the onClick event
  expect(startLoginSpy).toHaveBeenCalled(); 
});