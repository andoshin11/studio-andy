import 'reflect-metadata'
import { container, Lifecycle } from 'tsyringe'
import { Plugin } from '@nuxt/types'
import { ContentfulClient, createClient } from '@/infra/contentful'
import { Logger } from '@/infra/logger'
import PostGatewayImpl from '@/gateway/PostGateway'
import PostRepositoryImpl from '@/repositories/PostRepository'
import LogServiceImpl from '@/services/LogService'

const plugin: Plugin = (context) => {
  const { $sentry, store } = context

  const _container = container.createChildContainer()

  /**
   * Container Registration
   */

  // Infra
  _container.register<ContentfulClient>('ContentfulClient', { useValue: createClient() })

  // Gateway
  _container.register('PostGateway', { useClass: PostGatewayImpl }, { lifecycle: Lifecycle.Singleton })

  // Repository
  _container.register('PostRepository', { useClass: PostRepositoryImpl }, { lifecycle: Lifecycle.Singleton })

  // Service
  _container.register('LogService', { useClass: LogServiceImpl }, { lifecycle: Lifecycle.Singleton })

  // Others
  _container.register('Store', { useValue: store })
  _container.register<Logger>('Logger', { useValue: $sentry })

  context.$container = _container
}

export default plugin
