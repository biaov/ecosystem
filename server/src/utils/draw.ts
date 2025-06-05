import type { Canvas, CanvasRenderingContext2D, Image } from 'canvas'

/**
 * 方向值
 */
const directions = ['top', 'right', 'bottom', 'left']
/**
 * 线条宽度
 */
const lineWidth = 4
/**
 * 线条颜色
 */
const lineColor = '#fff'
/**
 * 小圆半径
 */
const r = 20

/**
 * 绘制验证码图片
 */
export class DrawImg {
  /**
   * canvas 对象
   */
  private canvas: Canvas
  /**
   * canvas 2d 渲染上下文对象
   */
  private ctx: CanvasRenderingContext2D
  /**
   * 图片对象
   */
  private image: Image
  /**
   * 背景图片信息
   */
  private bg: { url: string; size: [number, number] }
  /**
   * 验证码图片信息
   */
  private code: { url: string; size: [number, number]; initPos: [number, number] }
  /**
   * 目标位置
   */
  private target: [number, number]
  /**
   * 绘制类型
   * bg: 背景图片
   * code: 验证码图片
   */
  private type: 'bg' | 'code'
  /**
   * 圆圈方向和位置
   */
  private circles: [string, number][]

  constructor({ image, bg, canvas, ctx, code, target }) {
    this.image = image
    this.bg = bg
    this.canvas = canvas
    this.ctx = ctx
    this.code = code
    this.target = target
    this.circles = this.getCircle()
  }

  /**
   * 获取随机方向的圆圈
   */
  getCircle(list: [string, number, number][] = []) {
    if (list.length === 2) return list.toSorted((a, b) => a[2] - b[2])
    const index = random(4)
    const pos = directions[index]
    const outside = random(2)

    if (list.some(item => item[0] === pos)) {
      return this.getCircle(list)
    } else if (list.length < 2) {
      return this.getCircle([...list, [pos, outside, index]])
    }
  }

  /**
   * 绘制圆角线段
   */
  circleLine({ ctx, cx, cy, r, x, y, tx, ty }, type, circle) {
    const isLine = circle[0] === type
    const inside = !circle[1]
    switch (type) {
      case 'top':
        if (isLine) {
          ctx.lineTo(cx - r, y)
          ctx.arc(cx, y, r, Math.PI, 0, inside)
        }
        ctx.lineTo(tx, y)
        break
      case 'right':
        if (isLine) {
          ctx.lineTo(tx, cy - r)
          ctx.arc(tx, cy, r, 1.5 * Math.PI, 0.5 * Math.PI, inside)
        }
        ctx.lineTo(tx, ty)
        break
      case 'bottom':
        if (isLine) {
          ctx.lineTo(cx + r, ty)
          ctx.arc(cx, ty, r, 0, Math.PI, inside)
        }
        ctx.lineTo(x, ty)
        break
      case 'left':
        if (isLine) {
          ctx.lineTo(x, cy + r)
          ctx.arc(x, cy, r, 0.5 * Math.PI, 1.5 * Math.PI, inside)
        }
        ctx.lineTo(x, y)
        break
    }
  }

  /**
   * 绘制圆圈
   */
  drawCircle(point: Point) {
    const { circles, type, bg, target, ctx, image, code } = this
    let [w, h] = code.size
    let { x, y } = point

    const [circle1, circle2] = circles
    const [direction, outside] = circle1
    ctx.save()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.beginPath()
    circles.forEach(([direction, outside]) => {
      if (outside) {
        switch (direction) {
          case 'top':
            y += r
          case 'bottom':
            h -= r
            break
          case 'left':
            x += r
          case 'right':
            w -= r
            break
        }
      }
    })
    ctx.moveTo(x, y)
    const tx = x + w
    const ty = y + h
    const cx = x + w / 2
    const cy = y + h / 2
    const option = { ctx, r, tx, ty, x, y, cx, cy }
    switch (direction) {
      case 'top':
        this.circleLine(option, 'top', ['top', outside])
        this.circleLine(option, 'right', circle2)
        this.circleLine(option, 'bottom', circle2)
        this.circleLine(option, 'left', circle2)
        break
      case 'right':
        ctx.lineTo(tx, y)
        this.circleLine(option, 'right', ['right', outside])
        this.circleLine(option, 'bottom', circle2)
        this.circleLine(option, 'left', circle2)
        break
      case 'bottom':
        ctx.lineTo(tx, y)
        ctx.lineTo(tx, ty)
        this.circleLine(option, 'bottom', ['bottom', outside])
        this.circleLine(option, 'left', circle2)
        break
      case 'left':
        ctx.lineTo(tx, y)
        ctx.lineTo(tx, ty)
        ctx.lineTo(x, ty)
        this.circleLine(option, 'left', ['left', outside])
        break
      case 'no':
        ctx.lineTo(tx, y)
        ctx.lineTo(tx, ty)
        ctx.lineTo(x, ty)
        ctx.lineTo(x, y)
        break
    }
    ctx.clip()
    ctx.closePath()
    if (type === 'bg') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
      ctx.fillRect(point.x, point.y, code.size[0], code.size[1])
    } else {
      ctx.drawImage(image, -target[0], -target[1], bg.size[0], bg.size[1])
    }

    ctx.stroke()
    ctx.restore()
  }

  /**
   * 绘制验证码图片
   */
  draw(type?: 'bg' | 'code') {
    this.type = type || 'code'

    const { image, bg, canvas, ctx, code, target } = this

    if (this.type === 'bg') {
      canvas.width = bg.size[0]
      canvas.height = bg.size[1]
    } else {
      canvas.width = code.size[0]
      canvas.height = code.size[1]
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const [x, y] = target

    if (this.type === 'bg') {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      this.drawCircle({ x, y })
    } else {
      this.drawCircle({ x: 0, y: 0 })
    }

    return canvas.toDataURL('image/png') // 返回 base64 编码的图片数据
  }
}
