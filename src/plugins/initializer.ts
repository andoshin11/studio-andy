import 'reflect-metadata'
import { container, Lifecycle } from 'tsyringe'
import { Plugin } from '@nuxt/types'
import { ContentfulClient, createClient } from '@/infra/contentful'
import { Logger } from '@/infra/logger'
import PostGatewayImpl from '@/gateway/PostGateway'
import PostRepositoryImpl from '@/repositories/PostRepository'
import LogServiceImpl from '@/services/LogService'

const plugin: Plugin = context => {
  const { $sentry, store } = context

  /**
   * Container Registration
   */

  // Infra
  container.register<ContentfulClient>('ContentfulClient', { useValue: createClient() })

  // Gateway
  container.register('PostGateway', { useClass: PostGatewayImpl }, { lifecycle: Lifecycle.Singleton })

  // Repository
  container.register('PostRepository', { useClass: PostRepositoryImpl }, { lifecycle: Lifecycle.Singleton })

  // Service
  container.register('LogService', { useClass: LogServiceImpl }, { lifecycle: Lifecycle.Singleton })

  // Others
  container.register('Store', { useValue: store })
  container.register<Logger>('Logger', { useValue: $sentry })
}

export default plugin
