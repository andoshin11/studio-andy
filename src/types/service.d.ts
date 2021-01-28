declare interface BaseService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handle: (param?: any) => Promise<any>
}
