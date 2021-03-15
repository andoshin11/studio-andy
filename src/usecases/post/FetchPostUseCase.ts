import { injectable, inject } from 'tsyringe'
import PostGateway from '@/interface/gateway/PostGateway'
import PostRepository from '@/interface/repository/PostRepository'
import LogService, { LogType } from '@/interface/service/LogService'
import { PostData } from '@/domain/Post'

@injectable()
export default class FetchPostUseCase implements BaseUseCase {
  constructor(@inject('PostGateway') private postGateway: PostGateway, @inject('PostRepository') private postRepository: PostRepository, @inject('LogService') private logService: LogService) {}

  async execute(slug: PostData['slug']) {
    try {
      const post = await this.postGateway.getPost(slug)
      this.postRepository.savePost(post)
    } catch (e) {
      await this.logService.handle({ type: LogType.Error, error: e })
      throw e
    }
  }
}
