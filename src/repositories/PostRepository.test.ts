import 'reflect-metadata'
import Vue from 'vue'
import Vuex from 'vuex'
import { createStore } from '@/storeConstruct'
import PostRepository from './PostRepository'
import { PostPropsFactory } from '@/entities/Post'

Vue.use(Vuex)

describe('PostRepository', () => {
  test('should be able to save and get post', () => {
    const slug = 'test'
    const post = PostPropsFactory({ slug })
    const store = createStore()
    const repository = new PostRepository(store)

    expect(repository.getPost(slug)).toBeNull()

    repository.savePosts([post])

    expect(repository.getPost(slug)!.toJson()).toEqual(post)
  })
})
