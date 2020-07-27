import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import UploadWidget from './index';
import { getTestDefaultWidgetProps } from '../tools';
import FileStatus from 'scalable-form-tools/src/fileUtils/FileStatus';

Enzyme.configure({ adapter: new Adapter() });
const wrapper = Enzyme.mount(
  <UploadWidget
    {...getTestDefaultWidgetProps()}
    value={[
      {
        uid: '12',
        url: 'https://www.taobao.com',
        status: FileStatus.DONE,
      },
    ]}
  />,
);

describe('render UploadWidget', () => {
  it('should render snapshot without error', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
