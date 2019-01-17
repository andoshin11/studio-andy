import * as tsx from 'vue-tsx-support'
import { css, keyframes } from 'emotion'

export default tsx.component({
  name: 'Empty',
  render() {
    return <div class={style.empty} />
  }
})

const gradient = keyframes`
  0% {
    background-color: #eee;
  }

  50% {
    background-color: #ccc;
  }

  100% {
    background-color: #eee;
  }
`

const style = {
  empty: css`
    width: 100%;
    height: 100%;
    animation: ${gradient} 5s infinite;
  `
}
