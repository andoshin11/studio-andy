import ContentfulGateway from '@/gateway/ContentfulGateway'
import LogService, { LogType } from '@/services/LogService'
import PostRepository from '@/repositories/PostRepository'

export interface IFetchPostUseCase {
  logService: LogService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository
}

export default class FetchPostUseCase implements BaseUseCase {
  logService: LogService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository

  constructor({ logService, contentfulGateway, postRepository }: IFetchPostUseCase) {
    this.logService = logService
    this.contentfulGateway = contentfulGateway
    this.postRepository = postRepository
  }

  async execute(id: string) {
    try {
      const post = await this.contentfulGateway.getPost(id)
      this.postRepository.saveCurrentPost(post)
    } catch (error) {
      await this.logService.handle({ type: LogType.Error, error })
      throw new Error(error)
    }
  }
}
