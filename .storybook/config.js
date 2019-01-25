import { configure } from '@storybook/vue'

const req = require.context('../src', true, /\.story\.ts$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
