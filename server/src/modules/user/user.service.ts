import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserModel } from '@/models/user'

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserModel) private userRepository: Repository<UserModel>) {}

  find(id: number) {
    return this.userRepository.find({
      where: {
        id
      },
      relations: {}
    })
  }
}
