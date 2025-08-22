import { HttpStatus } from '@nestjs/common'

/**
 * 业务错误
 */
export class BizException extends HttpException {
  constructor(message: string, status?: HttpStatus) {
    super(message, status ?? HttpStatus.UNPROCESSABLE_ENTITY)
  }
}
