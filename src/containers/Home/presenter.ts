import PostEntity from '@/entities/Post'
import PostRepository from '@/repositories/PostRepository'

export enum ListType {
  Latest,
  Popular
}

export interface IPresenterParams {
  postRepository: PostRepository
  listType: ListType
}

export interface IPresenter {
  postList: PostEntity[]
}

export default ({ postRepository, listType }: IPresenterParams): IPresenter => {
  let postList: PostEntity[]
  if (listType == ListType.Latest) {
    postList = postRepository.getLatestPosts()
  } else {
    throw new Error('Unsupported List Type')
  }

  return {
    postList
  }
}
