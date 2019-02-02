import { storiesOf } from '@storybook/vue'
import Empty from 'studio-andy-app/src/components/Base/Empty/Empty.vue'

storiesOf('components/Base/Empty', module).add('Square', () => ({
  // render() {
  //   return (
  //     <div>
  //       <Empty />
  //     </div>
  //   )
  // }
  components: { Empty },
  template: '<div style="height:400px;width:400px"><Empty /></div>'
}))
// .add('Rectangle', () => ({
//   components: { Empty },
//   template: '<div style="height:200px;width:600px"><Empty /></div>'
// }))
