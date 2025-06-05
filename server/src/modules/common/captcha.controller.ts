import { createCanvas, loadImage } from 'canvas'
import { join } from 'path'
import { VerifyCaptchaDot } from './captcha.dot'

const imagePaths = Object.keys(import.meta.glob('@/assets/captch/*.png'))
const imgTasks = imagePaths.map(item => loadImage(join(process.cwd(), item)))
const images = await Promise.all(imgTasks)

@Controller('/captcha')
export class CaptchaController {
  @InjectRedis()
  private readonly redis: Redis

  @Get()
  async getCaptcha() {
    /**
     * 背景参数
     */
    const bg = {
      url: '',
      size: [670, 400]
    }
    /**
     * 验证码参数
     */
    const code = {
      url: '',
      size: [120, 120],
      initPos: [20, null]
    }

    const canvas = createCanvas(bg.size[0], bg.size[1])
    const ctx = canvas.getContext('2d')
    const index = random(images.length)
    /**
     * 随机图片对象
     */
    const image = images[index]
    /**
     * x 的最大值
     */
    const maxX = bg.size[0] - code.size[0]
    /**
     * 容差值
     */
    const gap = 20
    /**
     * 随机生成验证码目标位置
     */
    const target = [random(maxX - gap, maxX / 2 + gap / 2), random(bg.size[1] - code.size[1] - gap, gap)]
    code.initPos[1] = target[1]

    const drawImg = new DrawImg({ image, bg, canvas, ctx, code, target })
    /**
     * 为 base64 编码的图片
     * 也可转为网络路径图片增加传输速度
     */
    bg.url = drawImg.draw('bg')
    code.url = drawImg.draw()

    const id = randomId()

    this.redis.set(getRedisKey(CaptchaEnum.Image, id), JSON.stringify({ value: target }), 'EX', 60 * 5)

    return {
      id,
      bgElem: bg,
      elem: code
    }
  }

  @Post('/verify')
  async verifyCaptcha(@Body() { id, value }: VerifyCaptchaDot) {
    const res = await this.redis.get(getRedisKey(CaptchaEnum.Image, id))

    if (!res) throw new BizException('验证码已过期')

    const { value: target } = JSON.parse(res)
    const gap = 5

    if (Math.abs(value[0] - target[0]) < gap && Math.abs(value[1] - target[1]) < gap) {
      const id = randomId()
      const value = aesEncrypt(randomId())
      this.redis.set(getRedisKey(CaptchaEnum.Code, id), JSON.stringify({ value }), 'EX', 60 * 5)
      return { id, value }
    } else {
      throw new BizException('验证错误，请重试')
    }
  }
}
