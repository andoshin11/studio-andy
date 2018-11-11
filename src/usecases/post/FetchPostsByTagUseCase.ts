import ContentfulGateway from '@/gateway/ContentfulGateway'
import PostRepository from '@/repositories/PostRepository'
import ErrorService from '@/services/ErrorService'

export interface IFetchPostsByTagUseCase {
  errorService: ErrorService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository
}

export default class FetchPostsByTagUseCase implements BaseUseCase {
  errorService: ErrorService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository

  constructor({
    errorService,
    contentfulGateway,
    postRepository
  }: IFetchPostsByTagUseCase) {
    this.errorService = errorService
    this.contentfulGateway = contentfulGateway
    this.postRepository = postRepository
  }

  async execute(tag: string) {
    try {
      const posts = await this.contentfulGateway.getPostsByTag(tag)
      this.postRepository.saveLatestPosts(posts)
    } catch (error) {
      await this.errorService.handle(error)
      throw new Error(error)
    }
  }
}
