import { injectable, inject } from 'tsyringe'
import PostGateway from '@/interface/gateway/PostGateway'
import PostRepository from '@/interface/repository/PostRepository'
import LogService, { LogType } from '@/interface/service/LogService'
import { SortableKey } from '@/domain/Post'

@injectable()
export default class FetchPostsUseCase implements BaseUseCase {
  constructor(@inject('PostGateway') private postGateway: PostGateway, @inject('PostRepository') private postRepository: PostRepository, @inject('LogService') private logService: LogService) {}

  async execute(orderBy?: SortableKey) {
    try {
      const posts = await this.postGateway.getPosts(orderBy)
      this.postRepository.savePosts(posts, orderBy)
    } catch (e) {
      await this.logService.handle({ type: LogType.Error, error: e })
      throw e
    }
  }
}
