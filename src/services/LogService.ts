import { singleton, inject } from 'tsyringe'
import LogService from '@/interface/service/LogService'
import { Logger } from '@/infra/logger'

export interface ILogServiceArgs {
  logger?: Logger
}

export enum LogType {
  Error,
  Message,
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

@singleton()
export default class LogServiceImpl implements LogService {
  constructor(@inject('Logger') private logger: Logger) {}

  async handle(payload: LogPayload) {
    if (payload.type === LogType.Error) {
      this.logger.captureException(payload.error)
    } else if (payload.type === LogType.Message) {
      this.logger.captureMessage(payload.message)
    }
    return
  }
}
