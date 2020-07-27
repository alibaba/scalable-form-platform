import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import AnonymousWidget from './index';
import { getTestDefaultWidgetProps } from '../tools';

Enzyme.configure({ adapter: new Adapter() });
const wrapper = Enzyme.mount(
  <AnonymousWidget
    {...getTestDefaultWidgetProps()}
    options={{
      originWidget: 'test widget',
    }}
  />,
);

describe('render AnonymousWidget', () => {
  it('should render snapshot without error', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
