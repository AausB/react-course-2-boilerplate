import React from 'react';
import { shallow } from 'enzyme';

import { Header } from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => {}} />);

  expect(wrapper).toMatchSnapshot();

  // expect(wrapper.find('h1').length).toBe(1);
  // expect(wrapper.find('h1').text()).toBe('Expensify');
 
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
 
});

test('should call startLogout on button click', () => {
  const startLogoutSpy = jest.fn(); // define spy function
  const wrapper = shallow(<Header startLogout={startLogoutSpy} />);

  wrapper.find('button').simulate('click'); // simulate the onClick event
  expect(startLogoutSpy).toHaveBeenCalled(); 
});