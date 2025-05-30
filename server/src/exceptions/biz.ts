import { HttpException, HttpStatus } from '@nestjs/common'

export class BizException extends HttpException {
  constructor(message: string, status?: HttpStatus) {
    super(message, status ?? HttpStatus.UNPROCESSABLE_ENTITY)
  }
}
