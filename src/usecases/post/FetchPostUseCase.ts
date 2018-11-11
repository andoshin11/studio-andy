import ContentfulGateway from '@/gateway/ContentfulGateway'
import PostRepository from '@/repositories/PostRepository'
import ErrorService from '@/services/ErrorService'

export interface IFetchPostUseCase {
  errorService: ErrorService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository
}

export default class FetchPostUseCase implements BaseUseCase {
  errorService: ErrorService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository

  constructor({
    errorService,
    contentfulGateway,
    postRepository
  }: IFetchPostUseCase) {
    this.errorService = errorService
    this.contentfulGateway = contentfulGateway
    this.postRepository = postRepository
  }

  async execute(id: string) {
    try {
      const post = await this.contentfulGateway.getPost(id)
      this.postRepository.saveCurrentPost(post)
    } catch (error) {
      await this.errorService.handle(error)
      throw new Error(error)
    }
  }
}
