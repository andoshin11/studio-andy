export enum LogType {
  Error,
  Message,
}

export type LogPayload =
  | {
      type: LogType.Error
      error: Error
    }
  | {
      type: LogType.Message
      message: string
    }

export default interface LogService {
  handle: (payload: LogPayload) => Promise<void>
}
