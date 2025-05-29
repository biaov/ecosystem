import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import migrations from '@/migrations'

const modulesSync = import.meta.glob('@/modules/**/*.module.ts', { eager: true }) as Record<string, Record<string, new () => {}>>

const modules = Object.values(modulesSync)
  .map(module => Object.values(module))
  .flat()

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
      synchronize: import.meta.env.VITE_DB_SYNC,
      migrations,
      timezone: '+08:00',
      dateStrings: true
    }),
    ...modules
  ]
})
export class AppModule {}
