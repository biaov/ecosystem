export default [
  {
    '@nestjs/common': ['Injectable', 'Module', 'Controller', 'Post', 'Get', 'Put', 'Delete', 'Param', 'Body', 'UseGuards', 'HttpException', 'HttpStatus']
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
      'AfterUpdate'
    ]
  },
  {
    from: 'typeorm',
    imports: ['Repository'],
    type: true
  },
  {
    'class-transformer': ['Type']
  },
  {
    'class-validator': ['isEmpty', 'IsString', 'MaxLength', 'MinLength', 'IsNotEmpty', 'IsArray', 'ArrayNotEmpty', 'ValidateNested', 'IsNumber']
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
    from: './src/common/base.model.ts',
    imports: ['BaseModel'],
    type: false
  },
  {
    from: './src/modules/common/token.service.ts',
    imports: ['AuthGuard', 'AuthGuardAdmin'],
    type: false
  }
]
