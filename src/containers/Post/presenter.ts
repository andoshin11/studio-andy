import PostEntity from '@/entities/Post'
import PostRepository from '@/repositories/PostRepository'
import { filterOutNull } from '@/util/util'

export interface IPresenterParams {
  postRepository: PostRepository
}

export interface IPresenter {
  post: PostEntity | null
  relatedPosts: PostEntity[]
}

export default ({ postRepository }: IPresenterParams): IPresenter => {
  const post = postRepository.getCurrentPost()
  const relatedPosts = post ? filterOutNull(post.props.relatedPosts.map(slug => postRepository.getPost(slug))).splice(0, 2) : []
  return {
    post,
    relatedPosts
  }
}
