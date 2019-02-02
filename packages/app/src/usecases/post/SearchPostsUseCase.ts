import LogService, { LogType } from '@/services/LogService'
import ContentfulGateway from '@/gateway/ContentfulGateway'
import PostRepository from '@/repositories/PostRepository'

export interface ISearchPostsUseCase {
  logService: LogService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository
}

export default class SearchPostsUseCase implements BaseUseCase {
  logService: LogService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository

  constructor({ logService, contentfulGateway, postRepository }: ISearchPostsUseCase) {
    this.logService = logService
    this.contentfulGateway = contentfulGateway
    this.postRepository = postRepository
  }

  async execute(query: string) {
    try {
      // Check if the query already exists
      const cache = this.postRepository.getSearchQuery()

      if (query !== cache) {
        this.postRepository.saveSearchQuery(query)
        const results = await this.contentfulGateway.searchPosts(query)
        this.postRepository.saveSearchResults(results)
      }
    } catch (error) {
      await this.logService.handle({ type: LogType.Error, error })
      throw new Error(error)
    }
  }
}
