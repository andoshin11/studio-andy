declare interface BaseUseCase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (params?: any) => Promise<any>
}
