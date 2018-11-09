declare interface BaseUseCase {
  execute: (params?: any) => Promise<any>
}
