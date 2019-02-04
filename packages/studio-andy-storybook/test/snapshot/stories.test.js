import path from 'path'
import initStoryshots from '@storybook/addon-storyshots'

initStoryshots({
  framework: 'vue',
  configPath: path.join(__dirname, '../../.storybook')
})
