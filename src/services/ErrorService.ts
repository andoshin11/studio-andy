export interface IErrorServiceParams {
  context?: any
}

export default class ErrorService implements BaseService {
  context: any

  constructor({context}: IErrorServiceParams) {
    this.context = context
  }

  async handle(error: any) {
    console.log(`error called in ${this.context}`)
    console.log(error)
    return
  }
}
