import { injectable, inject } from 'tsyringe'
import PostGateway from '@/interface/gateway/PostGateway'
import PostRepository from '@/interface/repository/PostRepository'
import LogService, { LogType } from '@/interface/service/LogService'

@injectable()
export default class FetchPostSummariesUseCase implements BaseUseCase {
  constructor(@inject('PostGateway') private postGateway: PostGateway, @inject('PostRepository') private postRepository: PostRepository, @inject('LogService') private logService: LogService) {}

  async execute() {
    try {
      const postSummaries = await this.postGateway.getPostSummaries()
      this.postRepository.savePostSummaries(postSummaries)
    } catch (e) {
      await this.logService.handle({ type: LogType.Error, error: e })
      throw e
    }
  }
}
