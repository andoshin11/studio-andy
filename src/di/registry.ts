import 'reflect-metadata'
import { Lifecycle } from 'tsyringe'
import { Context } from '@nuxt/types'
import { createClient } from '@/infra/contentful'
import PostGatewayImpl from '@/gateway/PostGateway'
import PostRepositoryImpl from '@/repositories/PostRepository'
import LogServiceImpl from '@/services/LogService'

export type RegistryType = ReturnType<typeof containerRegistry>

export const containerRegistry = (context: Context) => ({
  ContentfulClient: {
    provider: { useValue: createClient() },
  },
  PostGateway: {
    provider: { useClass: PostGatewayImpl },
    options: { lifecycle: Lifecycle.Singleton },
  },
  PostRepository: {
    provider: { useClass: PostRepositoryImpl },
    options: { lifecycle: Lifecycle.Singleton },
  },
  LogService: {
    provider: { useClass: LogServiceImpl },
    options: { lifecycle: Lifecycle.Singleton },
  },
  Store: {
    provider: { useValue: context.store },
  },
  Logger: {
    provider: { useValue: context.$sentry },
  },
})
