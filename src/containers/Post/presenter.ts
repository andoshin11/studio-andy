import PostEntity from '@/entities/Post'
import PostRepository from '@/repositories/PostRepository'

export interface IPresenterParams {
  postRepository: PostRepository
  id: string
}

export interface IPresenter {
  post: PostEntity | null
}

export default ({ postRepository, id }: IPresenterParams): IPresenter => {
  return {
    post: postRepository.getPost(id)
  }
}
