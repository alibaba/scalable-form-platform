import React from 'react';
import FormEditor from '../src/index';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});
const wrapper = Enzyme.mount(
  <FormEditor />,
);

describe('render FormEditor', () => {
  it('should render snapshot without error', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
