import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ScalableFormAntExample from "../src/example";

Enzyme.configure({adapter: new Adapter()});
const wrapper = Enzyme.mount(
  <ScalableFormAntExample />
);

describe('ScalableFormAntExample Test', () => {
  it('snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
