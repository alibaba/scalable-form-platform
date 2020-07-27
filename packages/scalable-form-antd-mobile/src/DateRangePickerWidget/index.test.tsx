import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import DateRangePickerWidget from './index';
import { getTestDefaultWidgetProps } from '../tools';
import DateRange from 'scalable-form-tools/src/time/DateRange';

Enzyme.configure({ adapter: new Adapter() });
const wrapper = Enzyme.mount(
  <DateRangePickerWidget
    {...getTestDefaultWidgetProps()}
    value={['2012-12-12', '2012-12-20']}
    options={{ initRange: DateRange.BEFORE_WEEK }}
  />,
);

describe('render DateRangePickerWidget', () => {
  it('should render snapshot without error', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
