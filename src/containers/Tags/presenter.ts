import PostRepository from '@/repositories/PostRepository'
import PostEntity from '@/entities/Post'

export interface IPresenterParams {
  postRepository: PostRepository
}

export interface IPresenter {
  postList: PostEntity[]
  tag: string | null
}

export default ({ postRepository }: IPresenterParams): IPresenter => {
  return {
    postList: postRepository.getTagResult(),
    tag: postRepository.getCurrentTag()
  }
}
