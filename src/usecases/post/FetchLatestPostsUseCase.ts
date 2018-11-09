import ContentfulGateway from '@/gateway/ContentfulGateway'
import PostRepository from '@/repositories/PostRepository'
import ErrorService from '@/services/ErrorService'

export interface IFetchLatestPostsUseCase {
  errorService: ErrorService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository
}

export default class FetchLatestPostsUseCase implements BaseUseCase {
  errorService: ErrorService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository

  constructor({
    errorService,
    contentfulGateway,
    postRepository
  }: IFetchLatestPostsUseCase) {
    this.errorService = errorService
    this.contentfulGateway = contentfulGateway
    this.postRepository = postRepository
  }

  async execute() {
    try {
      const posts = await this.contentfulGateway.getPosts()
      this.postRepository.saveLatestPosts(posts)
    } catch (error) {
      await this.errorService.handle(error)
      throw new Error(error)
    }
  }
}
