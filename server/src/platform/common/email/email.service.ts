import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: import.meta.env.VITE_EMAIL_HOST,
  port: import.meta.env.VITE_EMAIL_PORT,
  secure: true,
  auth: {
    user: import.meta.env.VITE_EMAIL_USER,
    pass: import.meta.env.VITE_EMAIL_AUTH_CODE
  }
})

/**
 * email 服务
 */
@Injectable()
export class EmailService {
  @InjectRedis()
  private readonly redis: Redis

  send(to: string) {
    validator.email(to)
    const value = randomCode()
    this.redis.set(getRedisKey(CaptchaEnum.Code, to), JSON.stringify({ value }), 'EX', 60 * redisExpire)

    const option = {
      from: import.meta.env.VITE_EMAIL_USER,
      to,
      subject: '验证码',
      text: `您的验证码为: ${value}，有效时间 ${redisExpire} 分钟，请在有效时间内进行验证【ECOSYSTEM】`
    }
    return new Promise((resolve, reject) => {
      transport.sendMail(option, (error, info) => {
        if (error) reject(error)
        resolve(info)
      })
    })
  }
  async verify(username: string, code: string) {
    const key = getRedisKey(CaptchaEnum.Code, username)
    const res = await this.redis.get(key)
    if (!res) throw new BizException('验证已过期')
    const cacheValue = JSON.parse(res).value
    if (code !== cacheValue) throw new BizException('验证码错误，请重试')
    this.redis.del(key)
    return true
  }
}
