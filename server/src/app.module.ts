import migrations from '@/migrations'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { TransformResponseInterceptor } from '@/http.interceptor'
import { RedisCacheModule } from '@/redis.module'

const modulesSync = import.meta.glob('@/modules/**/*.module.ts', { eager: true }) as Record<string, Record<string, new () => {}>>

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
      type: 'mysql',
      host: import.meta.env.VITE_DB_HOST,
      port: 3306,
      username: 'root',
      password: import.meta.env.VITE_DB_PASSWORD,
      database: import.meta.env.VITE_DB_NAME,
      autoLoadEntities: true,
      synchronize: isSyns,
      dropSchema: isSyns,
      migrations,
      entityPrefix: import.meta.env.VITE_DB_PREFIX,
      migrationsTransactionMode: 'all',
      timezone: '+08:00',
      dateStrings: true,
      connectorPackage: 'mysql2'
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
