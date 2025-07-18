import { RedisModule } from '@nestjs-modules/ioredis'

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: `redis://${import.meta.env.VITE_REDIS_HOST}:${import.meta.env.VITE_REDIS_PROT}`,
      options: {
        password: import.meta.env.VITE_REDIS_PASSWORD
      }
    })
  ]
})
export class RedisCacheModule {}
