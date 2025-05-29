import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModel } from '@/models/user'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UsersModule {}
