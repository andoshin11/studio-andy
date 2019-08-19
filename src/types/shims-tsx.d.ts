import Vue, { VNode } from 'vue'

declare global {
  // eslint-disable-next-line
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {}
  }
}
