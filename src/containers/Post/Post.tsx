import * as tsx from 'vue-tsx-support'
import styles from './styles.css'

import Presenter, { IPresenter } from './presenter'
import PostRepository from '@/repositories/PostRepository'
import PostEntity from '@/entities/Post'
import PostTitle from '@/components/Base/Post/Title'
// const _PostTitle = () => import('@/components/Base/Post/Title')
import PostDate from '@/components/Base/Post/Date'
import TagList from '@/components/Base/Post/TagList'
import HeaderImg from '@/components/Base/Post/HeaderImg'
import Markdown from '@/components/Base/Markdown'
import SocialButtons from '@/components/Modules/SocialButtons'
import Loading from '@/components/Base/Loading'
import PostList from '@/components/Modules/PostList'

// type Resolved<T> = T extends Promise<infer R> ? R : never

// const PostTitle = _PostTitle as any as Resolved<ReturnType<typeof _PostTitle>>['default']

interface Events {
  onFetchRelatedPosts: (post: PostEntity) => void
}

export default tsx.componentFactoryOf<Events>().create({
  name: 'Post',
  computed: {
    presenter(): IPresenter {
      return Presenter({
        postRepository: new PostRepository(this.$store)
      })
    },
    pagePath(): string {
      const base = 'https://blog.andoshin11.me'
      return base + this.$route.fullPath
    },
    isClient(): boolean {
      return typeof window !== undefined
    }
  },
  methods: {
    fetchRelatedPosts() {
      if (this.presenter.post) {
        this.$emit('fetchRelatedPosts', this.presenter.post)
      }
    }
  },
  beforeCreate() {
    if ((styles as any).__inject__) {
      ;(styles as any).__inject__(this.$ssrContext)
    }
  },
  head() {
    const post = this.presenter.post
    return {
      title: `${this.presenter.post ? this.presenter.post.props.title : ''} | Studio Andy`,
      meta: [
        { hid: 'description', name: 'description', content: post ? post.props.summary : '' },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:description', property: 'og:description', content: post ? post.props.summary : '' },
        { hid: 'og:title', property: 'og:title', content: post ? post.props.title : '' },
        { hid: 'og:image', property: 'og:image', content: post ? `https:${post.props.headerImage.fields.file.url}` : '' },
        { hid: 'og:url', property: 'og:url', content: `https://blog.andoshin11.me/posts/${post ? post.props.slug : ''}` }
      ]
    }
  },
  render() {
    return (
      <div class={styles.Post}>
        {this.presenter.post && !this.presenter.post.props.isPublished ? <div class={styles.preview}>未公開の記事をPreview機能で閲覧中です。この記事はURLを知っているユーザーにしか表示されません。</div> : null}
        <div class={styles.inner}>
          <div class={styles.header}>
            <HeaderImg post={this.presenter.post} />
            <PostDate text={this.presenter.post ? this.presenter.post.props.publishedAt : ''} />
            <PostTitle title={this.presenter.post ? this.presenter.post.props.title : ''} />
            <TagList list={this.presenter.post ? this.presenter.post.props.tags : []} />
          </div>
          <div class={styles.body}>
            {this.presenter.post ? (
              <div class={styles.socialLinks}>
                <SocialButtons pagePath={this.pagePath} post={this.presenter.post} />
              </div>
            ) : null}
            <div class={styles.content}>
              <Markdown text={this.presenter.post ? this.presenter.post.props.content : ''} />
            </div>
          </div>
        </div>
        <lazy-component class={styles.relatedPosts} onshow={this.fetchRelatedPosts}>
          {!this.presenter.relatedPosts.length && false ? (
            <Loading />
          ) : (
            <template>
              <div class={styles.relatedPostsLabel}>関連する記事</div>
              <PostList data={this.presenter.relatedPosts} />
            </template>
          )}
        </lazy-component>
      </div>
    )
  }
})
