export default [
  {
    '@nestjs/common': ['Injectable', 'Module', 'Controller', 'Post', 'Get', 'Put', 'Delete', 'Param', 'Body']
  },
  {
    '@nestjs/typeorm': ['InjectRepository', 'TypeOrmModule']
  },
  {
    typeorm: ['Entity', 'PrimaryGeneratedColumn', 'Column', 'OneToOne', 'CreateDateColumn', 'UpdateDateColumn', 'JoinColumn', 'BeforeInsert', 'BeforeUpdate']
  },
  {
    'class-transformer': ['Type']
  },
  {
    'class-validator': ['isEmpty', 'IsString', 'MaxLength', 'MinLength', 'IsNotEmpty', 'IsArray', 'ArrayNotEmpty', 'ValidateNested', 'IsNumber']
  },
  {
    '@nestjs-modules/ioredis': ['InjectRedis']
  }
  // {
  //   ioredis: [['default', 'Redis']]
  // }
]
