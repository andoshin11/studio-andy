import { injectable, inject } from 'tsyringe'
import PostGateway from '@/interface/gateway/PostGateway'
import PostRepository from '@/repositories/PostRepository'
import LogService, { LogType } from '@/services/LogService'

@injectable()
export default class SearchPostsUseCase implements BaseUseCase {
  constructor(@inject('PostGateway') private postGateway: PostGateway, @inject('PostRepository') private postRepository: PostRepository, @inject('LogService') private logService: LogService) {}

  async execute(query: string) {
    try {
      const postSummaries = await this.postGateway.searchPosts(query)
      this.postRepository.saveSearchResult(query, postSummaries)
    } catch (e) {
      await this.logService.handle({ type: LogType.Error, error: e })
      throw e
    }
  }
}
