import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import CheckboxWidget from './index';
import { getTestDefaultWidgetProps } from '../tools';

Enzyme.configure({ adapter: new Adapter() });
const wrapper = Enzyme.mount(
  <CheckboxWidget
    {...getTestDefaultWidgetProps()}
    value={['test1']}
    options={{
      enumOptions: [
        {
          label: '测试label',
          value: 'test1',
        },
        {
          label: '测试label2',
          value: 'test2',
        },
      ],
    }}
  />,
);

describe('render CheckboxWidget', () => {
  it('should render snapshot without error', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
