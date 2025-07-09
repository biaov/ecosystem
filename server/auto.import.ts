import { resolve } from 'path'

/**
 * 获取路径
 */
const getPath = path => resolve(import.meta.dirname, path).replace(/\\/g, '/')

export default [
  { '@nestjs/platform-express': ['FileInterceptor'] },
  { multer: ['diskStorage'] },
  {
    '@nestjs/core': ['APP_INTERCEPTOR', 'APP_GUARD', 'RouterModule', 'NestFactory']
  },
  {
    dayjs: [['default', 'dayjs']]
  },
  {
    '@nestjs/common': [
      'Injectable',
      'Module',
      'Controller',
      'Post',
      'Get',
      'Patch',
      'Put',
      'Delete',
      'Param',
      'Query',
      'Body',
      'Header',
      'UseGuards',
      'HttpException',
      'HttpStatus',
      'ValidationPipe',
      'UnprocessableEntityException',
      'Global',
      'applyDecorators',
      'SetMetadata',
      'ParseIntPipe',
      'UploadedFile',
      'UseInterceptors',
      'Ip'
    ]
  },
  {
    '@nestjs/typeorm': ['InjectRepository', 'TypeOrmModule']
  },
  {
    typeorm: [
      'Entity',
      'BaseEntity',
      'PrimaryGeneratedColumn',
      'Column',
      'OneToOne',
      'ManyToOne',
      'OneToMany',
      'CreateDateColumn',
      'UpdateDateColumn',
      'JoinColumn',
      'BeforeInsert',
      'BeforeUpdate',
      'AfterInsert',
      'AfterUpdate',
      'Like',
      'Between',
      'TreeParent',
      'TreeChildren',
      'Tree',
      'AfterLoad'
    ]
  },
  {
    from: 'typeorm',
    imports: ['Repository', 'FindOperator', 'TreeRepository'],
    type: true
  },
  {
    'class-transformer': ['Type', 'Transform']
  },
  {
    'class-validator': [
      'IsString',
      'MaxLength',
      'MinLength',
      'IsNotEmpty',
      'IsArray',
      'ArrayNotEmpty',
      'ValidateNested',
      'IsNumber',
      'IsInt',
      'IsOptional',
      'IsPositive',
      'IsBoolean',
      'IsEnum',
      'IsObject'
    ]
  },
  {
    '@nestjs-modules/ioredis': ['InjectRedis']
  },
  {
    from: 'ioredis',
    imports: ['Redis'],
    type: true
  },
  {
    jsonwebtoken: [['default', 'jwt']]
  },
  {
    from: getPath('./src/platform/common/token/token.service.ts'),
    imports: ['AuthGuard', 'AuthGuardAdmin', 'AuthGuardAll'],
    type: false
  }
]
