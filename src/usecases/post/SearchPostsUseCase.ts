import ErrorService from '@/services/ErrorService'
import ContentfulGateway from '@/gateway/ContentfulGateway'
import PostRepository from '@/repositories/PostRepository'

export interface ISearchPostsUseCase {
  errorService: ErrorService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository
}

export default class SearchPostsUseCase implements BaseUseCase {
  errorService: ErrorService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository

  constructor({ errorService, contentfulGateway, postRepository }: ISearchPostsUseCase) {
    this.errorService = errorService
    this.contentfulGateway = contentfulGateway
    this.postRepository = postRepository
  }

  async execute(query: string) {
    try {
      this.postRepository.saveSearchQuery(query)
      const results = await this.contentfulGateway.searchPosts(query)
      this.postRepository.saveSearchResults(results)
    } catch (error) {
      await this.errorService.handle(error)
      throw new Error(error)
    }
  }
}
