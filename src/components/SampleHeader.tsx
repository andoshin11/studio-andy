import * as tsx from 'vue-tsx-support'

export default tsx.component({
  name: 'SampleHeader',
  props: {
    title: {
      type: String,
      required: true as true
    }
  },
  render() {
    return (
      <div>
        <h1>{this.title}</h1>
      </div>
    )
  }
})
