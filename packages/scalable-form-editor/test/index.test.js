import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import XFormEditorExample from "../src/example";

Enzyme.configure({adapter: new Adapter()});
const wrapper = Enzyme.mount(
  <XFormEditorExample />
);

describe('XFormEditorExample Test', () => {
  it('snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
