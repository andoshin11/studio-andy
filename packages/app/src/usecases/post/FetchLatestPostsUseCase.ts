import ContentfulGateway from '@/gateway/ContentfulGateway'
import PostRepository from '@/repositories/PostRepository'
import LogService, { LogType } from '@/services/LogService'

export interface IFetchLatestPostsUseCase {
  logService: LogService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository
}

export default class FetchLatestPostsUseCase implements BaseUseCase {
  logService: LogService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository

  constructor({ logService, contentfulGateway, postRepository }: IFetchLatestPostsUseCase) {
    this.logService = logService
    this.contentfulGateway = contentfulGateway
    this.postRepository = postRepository
  }

  async execute() {
    try {
      // Check if the post already exists
      const data = this.postRepository.getLatestPosts()
      if (data.length > 1) return

      const posts = await this.contentfulGateway.getPosts()
      this.postRepository.saveLatestPosts(posts)
    } catch (error) {
      await this.logService.handle({ type: LogType.Error, error })
      throw new Error(error)
    }
  }
}
