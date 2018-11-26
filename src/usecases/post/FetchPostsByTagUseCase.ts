import ContentfulGateway from '@/gateway/ContentfulGateway'
import PostRepository from '@/repositories/PostRepository'
import LogService, { LogType } from '@/services/LogService'

export interface IFetchPostsByTagUseCase {
  logService: LogService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository
}

export default class FetchPostsByTagUseCase implements BaseUseCase {
  logService: LogService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository

  constructor({ logService, contentfulGateway, postRepository }: IFetchPostsByTagUseCase) {
    this.logService = logService
    this.contentfulGateway = contentfulGateway
    this.postRepository = postRepository
  }

  async execute(tag: string) {
    try {
      const posts = await this.contentfulGateway.getPostsByTag(tag)
      this.postRepository.saveLatestPosts(posts)
    } catch (error) {
      await this.logService.handle({ type: LogType.Error, error })
      throw new Error(error)
    }
  }
}
