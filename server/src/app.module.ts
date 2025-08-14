import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { TransformResponseInterceptor, LogInterceptor } from '@/common/base.interceptor'
import { RedisCacheModule } from '@/redis.module'
import { GroupModule } from '@/modules'

const moduleSync = import.meta.glob('@/platform/**/*.module.ts', { eager: true }) as Record<string, Record<string, new () => void>>
const modules = Object.values(moduleSync).map(value => Object.values(value)[0])

/**
 * 是否同步数据库
 */
const isSyns = import.meta.env.VITE_DB_SYNC === 'true'

const imports = [
  ...modules,
  TypeOrmModule.forRoot({
    ...databaseOptions,
    autoLoadEntities: true,
    synchronize: isSyns
  }),
  RedisCacheModule,
  GroupModule
]

if (!import.meta.env.PROD) {
  // 开发环境使用静态目录
  imports.push(
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      useGlobalPrefix: false,
      serveRoot: '/uploads'
    })
  )
}

@Module({
  imports,
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor
    }
  ]
})
export class AppModule {}
