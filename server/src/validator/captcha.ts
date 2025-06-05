@Injectable()
export class CaptchaValidator {
  @InjectRedis()
  private readonly redis: Redis

  async verify(id, value) {
    const res = await this.redis.get(getRedisKey(CaptchaEnum.Image, id))

    if (!res) throw new BizException('验证码已失效')

    const cacheValue = aesDecrypt(JSON.parse(res).value)
    if (cacheValue !== value) throw new BizException('验证错误，请重试')

    return true
  }
}
