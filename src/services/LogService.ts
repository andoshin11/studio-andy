import { Logger } from '@/typings/nuxt'

export interface ILogServiceArgs {
  logger?: Logger
}

export enum LogType {
  Error,
  Message
}

type LogPayload =
  | {
      type: LogType.Error
      error: Error
    }
  | {
      type: LogType.Message
      message: string
    }

export default class LogService implements BaseService {
  logger?: Logger

  constructor({ logger }: ILogServiceArgs) {
    this.logger = logger
  }

  async handle(payload: LogPayload) {
    if (!this.logger) return

    if (payload.type === LogType.Error) {
      this.logger.captureException(payload.error)
    } else if (payload.type === LogType.Message) {
      this.logger.captureMessage(payload.message)
    }
    return
  }
}
