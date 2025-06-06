@Injectable()
export class CaptchaService {
  @InjectRedis()
  private readonly redis: Redis

  async verifyImage(id, value) {
    const key = getRedisKey(CaptchaEnum.Image, id)
    const res = await this.redis.get(key)

    if (!res) throw new BizException('验证码已过期')

    const { value: target } = JSON.parse(res)
    const gap = 5

    if (Math.abs(value[0] - target[0]) < gap && Math.abs(value[1] - target[1]) < gap) {
      this.redis.del(key)
      const id = randomId()
      const value = randomId()
      const returnValue = aesEncrypt(value)
      this.redis.set(getRedisKey(CaptchaEnum.Code, id), JSON.stringify({ value }), 'EX', 60 * 5)
      return { id, value: returnValue }
    } else {
      throw new BizException('验证错误，请重试')
    }
  }

  async verify(id, value) {
    const key = getRedisKey(CaptchaEnum.Code, id)
    const res = await this.redis.get(key)

    if (!res) throw new BizException('验证已过期')

    const paramValue = aesDecrypt(value)
    const cacheValue = JSON.parse(res).value
    if (paramValue !== cacheValue) throw new BizException('验证错误，请重试')
    this.redis.del(key)
    return true
  }
}
