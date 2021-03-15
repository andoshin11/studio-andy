export default class BaseEntity<T> {
  constructor(public _data: T) {}

  toJson(): T {
    return this._data
  }
}
