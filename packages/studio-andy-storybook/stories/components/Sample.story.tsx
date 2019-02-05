import { storiesOf } from '@storybook/vue'

storiesOf('sample', module).add('default', () => ({
  template: `
  <div class="Storybook">
    <div class="StorybookSection">
      <div class="StorybookSection__Header">Sample component</div>
      <div class="StorybookSection__Body">
        <div>sample text</div>
      </div>
    </div>
  </div>
  `
}))
