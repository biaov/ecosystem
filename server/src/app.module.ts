import { APP_INTERCEPTOR } from '@nestjs/core'
import { TransformResponseInterceptor } from '@/http.interceptor'
import { RedisCacheModule } from '@/redis.module'

const modulesSync = import.meta.glob('@/modules/**/*.module.ts', { eager: true }) as Record<string, Record<string, new () => unknown>>

const modules = Object.values(modulesSync)
  .map(module => Object.values(module))
  .flat()

/**
 * 是否同步数据库
 */
const isSyns = import.meta.env.VITE_DB_SYNC === 'true'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseOptions,
      autoLoadEntities: true,
      synchronize: isSyns
    }),
    ...modules,
    RedisCacheModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor
    }
  ]
})
export class AppModule {}
