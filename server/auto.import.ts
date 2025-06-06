export default [
  {
    '@nestjs/common': ['Injectable', 'Module', 'Controller', 'Post', 'Get', 'Put', 'Delete', 'Param', 'Body']
  },
  {
    '@nestjs/typeorm': ['InjectRepository', 'TypeOrmModule']
  },
  {
    typeorm: ['Entity', 'PrimaryGeneratedColumn', 'Column', 'OneToOne', 'ManyToOne', 'OneToMany', 'CreateDateColumn', 'UpdateDateColumn', 'JoinColumn', 'BeforeInsert', 'BeforeUpdate']
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
  }
]
