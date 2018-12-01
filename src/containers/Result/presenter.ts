import PostRepository from '@/repositories/PostRepository'
import PostEntity from '@/entities/Post'

export interface IPresenterParams {
  postRepository: PostRepository
}

export interface IPresenter {
  postList: PostEntity[]
  query: string | null
}

export default ({ postRepository }: IPresenterParams): IPresenter => {
  return {
    postList: postRepository.getSearchResults(),
    query: postRepository.getSearchQuery()
  }
}
