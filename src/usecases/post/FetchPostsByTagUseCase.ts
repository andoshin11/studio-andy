import { injectable, inject } from 'tsyringe'
import PostGateway from '@/interface/gateway/PostGateway'
import PostRepository from '@/repositories/PostRepository'
import LogService, { LogType } from '@/services/LogService'
import { Tag } from '@/domain/Post'

@injectable()
export default class FetchPostsByTagUseCase implements BaseUseCase {
  constructor(@inject('PostGateway') private postGateway: PostGateway, @inject('PostRepository') private postRepository: PostRepository, @inject('LogService') private logService: LogService) {}

  async execute(tag: Tag) {
    try {
      const posts = await this.postGateway.getPostsByTag(tag)
      this.postRepository.saveTagResult(tag, posts)
    } catch (e) {
      await this.logService.handle({ type: LogType.Error, error: e })
      throw e
    }
  }
}
