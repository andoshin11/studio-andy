import { UA } from 'nuxt-user-agent'
import { Logger } from '@/typings/nuxt'

export interface ILogServiceArgs {
  logger: Logger
  ua?: UA
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
  logger: Logger
  ua: UA

  constructor({ logger, ua }: ILogServiceArgs) {
    this.logger = logger
    this.ua = ua
    this.logger.configureScope(scope => {
      scope.setTag('UA', ua.original())
    })
  }

  async handle(payload: LogPayload) {
    if (payload.type === LogType.Error) {
      this.logger.captureException(payload.error)
    } else if (payload.type === LogType.Message) {
      this.logger.captureMessage(payload.message)
    }
    return
  }
}
