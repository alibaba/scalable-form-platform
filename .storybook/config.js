import {addParameters, configure} from '@storybook/react';
addParameters({
  viewport: {}
});

function loadStories() {
  const req = require.context('../__stories__', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
