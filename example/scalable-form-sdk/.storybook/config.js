import {addParameters, configure} from '@storybook/react';
addParameters({
  viewport: {}
});

function loadStories() {
  const req = require.context('../src', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
