import PostEntity from '@/entities/Post'
import PostRepository from '@/repositories/PostRepository'

export interface IPresenterParams {
  postRepository: PostRepository
}

export interface IPresenter {
  post: PostEntity | null
}

export default ({ postRepository }: IPresenterParams): IPresenter => {
  return {
    post: postRepository.getCurrentPost()
  }
}
