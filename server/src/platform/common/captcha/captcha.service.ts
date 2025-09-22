import { EmailService } from '@/platform/common/email/email.service'

@Injectable()
export class CaptchaService {
  @InjectRedis()
  private readonly redis: Redis

  constructor(private readonly emailService: EmailService) {}

  async verifyImage(id, value, username) {
    const key = getRedisKey(CaptchaEnum.Image, id)
    const res = await this.redis.get(key)

    if (!res) throw new BizException('验证码已过期')

    const { value: target } = JSON.parse(res)
    const gap = 5 // 容差
    if (Math.abs(value[0] - target[0]) < gap && Math.abs(value[1] - target[1]) < gap) {
      this.redis.del(key)
      try {
        await this.emailService.send(username)
      } catch {
        throw new BizException('邮件发送失败，请检查邮箱是否正确')
      }
      return true
    } else {
      throw new BizException('验证错误，请重试')
    }
  }
}
