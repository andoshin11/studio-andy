import { storiesOf } from '@storybook/vue'
const Date = () => import('./Date.vue')

storiesOf('components/Base/Post/Date', module)
  .add('Default', () => ({
    components: { Date },
    template: '<div><Date text="2019/1/25" /></div>'
  }))
  .add('Empty', () => ({
    components: { Date },
    template: '<div><Date /></div>'
  }))
