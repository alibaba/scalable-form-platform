import {addParameters, configure} from '@storybook/react';
addParameters({
  viewport: {}
});

function loadStories() {
  const req = require.context('../src', true, /\.stories\.tsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

// TODO 是否可以替换为ts
