enum ErrorType {
  NOT_FOUND,
  SERVER_ERROR,
  UNAUTHORIZED
}

class ErrorBase extends Error {
  msg: string
  constructor(msg: string, type: ErrorType) {
    super(msg)
    this.name = this.constructor.name
    this.msg = msg

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = new Error(msg).stack
    }
  }
}

export class NotFoundError extends ErrorBase {
  constructor(msg) {
    super(msg, ErrorType.NOT_FOUND)
  }
}
