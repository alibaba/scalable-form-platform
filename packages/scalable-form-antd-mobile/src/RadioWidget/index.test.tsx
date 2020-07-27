import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import RadioWidget from './index';
import { getTestDefaultWidgetProps } from '../tools';

Enzyme.configure({ adapter: new Adapter() });
const wrapper = Enzyme.mount(
  <RadioWidget
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

describe('render RadioWidget', () => {
  it('should render snapshot without error', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
