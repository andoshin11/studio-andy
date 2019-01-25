declare function embedly(type: string, elm: Element): void

declare module '@storybook/vue' {
  function storiesOf(kind: string, module: NodeModule): Story
  interface Story {
    add(storyName: string, getStory: () => any): this
  }
}
