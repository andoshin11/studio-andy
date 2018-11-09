export interface ITagProps {
  id: string
  name: string
}

export default class TagEntity {
  private _props: ITagProps

  constructor(props: ITagProps) {
    this._props = props
  }

  get props(): ITagProps {
    return this._props
  }
}

export const TagFactory = (): TagEntity => {
  const dummyProps: ITagProps = {
    id: 'dummyId',
    name: 'Vue.js'
  }

  return new TagEntity(dummyProps)
}
