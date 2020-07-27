import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import SelectWidget from './index';
import { getTestDefaultWidgetProps } from '../tools';

Enzyme.configure({ adapter: new Adapter() });
const wrapper = Enzyme.mount(
  <SelectWidget
    {...getTestDefaultWidgetProps()}
    value={'1'}
    options={{
      enumOptions: [
        {
          value: '1',
          label: 'yi',
        },
        {
          value: '2',
          label: 'er',
        },
      ],
    }}
  />,
);

describe('render SelectWidget', () => {
  it('should render snapshot without error', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
