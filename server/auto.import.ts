export default [
  {
    '@nestjs/common': ['Injectable', 'Module', 'Controller', 'Post', 'Get', 'Put', 'Delete', 'Param', 'Body']
  },
  {
    '@nestjs/typeorm': ['InjectRepository', 'TypeOrmModule']
  },
  {
    typeorm: ['Entity', 'PrimaryGeneratedColumn', 'Column', 'OneToOne', 'CreateDateColumn', 'UpdateDateColumn', 'JoinColumn']
  },
  {
    'class-validator': ['isEmpty', 'IsString', 'MaxLength', 'MinLength', 'IsNotEmpty']
  }
]
