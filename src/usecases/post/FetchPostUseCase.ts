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

  async execute(slug: string) {
    try {
      // Check if the post already exists
      const data = this.postRepository.getPost(slug)

      const post = data ? data.props : await this.contentfulGateway.getPost(slug)

      this.postRepository.saveCurrentPost(post)
    } catch (error) {
      await this.logService.handle({ type: LogType.Message, message: error.message })
      throw error
    }
  }
}
