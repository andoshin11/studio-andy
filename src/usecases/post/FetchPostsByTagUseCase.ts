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
      // Check if the result already exists
      const cache = this.postRepository.getCurrentTag()

      if (tag !== cache) {
        this.postRepository.saveCurrentTag(tag)
        const results = await this.contentfulGateway.getPostsByTag(tag)
        this.postRepository.saveTagResult(results)
      }
    } catch (error) {
      await this.logService.handle({ type: LogType.Error, error })
      throw new Error(error)
    }
  }
}
