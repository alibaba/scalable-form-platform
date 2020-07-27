import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import SliderWidget from './index';
import { getTestDefaultWidgetProps } from '../tools';

Enzyme.configure({ adapter: new Adapter() });
const wrapper = Enzyme.mount(<SliderWidget {...getTestDefaultWidgetProps()} value={3} />);

describe('render SliderWidget', () => {
  it('should render snapshot without error', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
