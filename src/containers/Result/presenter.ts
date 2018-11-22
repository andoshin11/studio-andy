import PostRepository from '@/repositories/PostRepository'
import PostEntity from '@/entities/Post'

export interface IPresenterParams {
  postRepository: PostRepository
}

export interface IPresenter {
  postList: PostEntity[]
}

export default ({ postRepository }: IPresenterParams): IPresenter => {
  return {
    postList: postRepository.getSearchResults()
  }
}
