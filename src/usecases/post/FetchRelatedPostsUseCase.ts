import ContentfulGateway from '@/gateway/ContentfulGateway'
import PostRepository from '@/repositories/PostRepository'
import PostEntity from '@/entities/Post'
import LogService, { LogType } from '@/services/LogService'
import { unique } from '@/util/util'

export interface IFetchRelatedPostsUseCase {
  logService: LogService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository
}

export default class FetchRelatedPostsUseCase implements BaseUseCase {
  logService: LogService
  contentfulGateway: ContentfulGateway
  postRepository: PostRepository

  constructor({ logService, contentfulGateway, postRepository }: IFetchRelatedPostsUseCase) {
    this.logService = logService
    this.contentfulGateway = contentfulGateway
    this.postRepository = postRepository
  }

  async execute(post: PostEntity) {
    try {
      // Since I haven't figure it out to get "related" posts via Contentful API,
      // here I simply fetch posts by each tags

      let relatedPosts: string[] = []

      const tags = post.props.tags

      await Promise.all(
        tags.map(async tag => {
          const posts = await this.contentfulGateway.getPostsByTag(tag)
          const slugs = posts.map(post => post.slug)
          relatedPosts = [...relatedPosts, ...slugs]
        })
      )

      // Filter out both origin and duplication
      const filtered = unique(relatedPosts.filter(slug => slug !== post.props.slug))

      post.updateRelatedPosts(filtered)

      this.postRepository.savePosts([post.props])
    } catch (error) {
      await this.logService.handle({ type: LogType.Error, error })
      throw new Error(error)
    }
  }
}
