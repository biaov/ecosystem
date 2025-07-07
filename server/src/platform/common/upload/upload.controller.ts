@UseGuards(AuthGuardAdmin)
@Controller('upload')
export class UploadController {
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename(_, file, callback) {
          callback(null, `${randomId()}.${file.originalname.split('.').at(-1)}`)
        }
      }),
      limits: {
        fileSize: 1024 * 1024 * 1
      },
      fileFilter(_, file, callback) {
        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
          callback(new BizException('只能上传 jpg、jpeg、png 格式的图片'), false)
        } else {
          callback(null, true)
        }
      }
    })
  )
  @Post('image')
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BizException('文件上传失败')
    return {
      url: `${import.meta.env.VITE_ASSETS_BASEURL + file.path}`.replace('\\', '/')
    }
  }
}
