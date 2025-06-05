import { RedisModule } from '@nestjs-modules/ioredis'

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: `redis://${import.meta.env.VITE_REDIS_HOST}:${import.meta.env.VITE_REDIS_PROT}`
    })
  ]
})
export class RedisCacheModule {}
