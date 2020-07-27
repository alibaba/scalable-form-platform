import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import InputWidget from './index';
import { getTestDefaultWidgetProps } from '../tools';

Enzyme.configure({ adapter: new Adapter() });
const wrapper = Enzyme.mount(<InputWidget {...getTestDefaultWidgetProps()} />);

describe('render InputWidget', () => {
  it('should render snapshot without error', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
