# ecosystem-server

生态系统的服务端

## 安装依赖

```sh
npm i
```

## 运行项目

- 复制根目录文件 `.env.development` 重命名为 `.env.production`

```sh
npm start
```

## 打包项目

```sh
npm run build
```

### 命名规范

- 短横线命名(kebab-case): 文件名
- 帕斯卡命名(PascalCase, 大驼峰命名: CamelCase): 枚举命名, 类型命名, 类命名
- 小驼峰命名(camelCase): 变量命名

### 技术栈

- `Vite` + `TS` + `Node` + `Express` + `Sequelize` + `MySQL`

### 依赖特性

#### dependencies

- `express`: Node 开发框架
- `jsonwebtoken`: token 生成
- `md5`: 加密库
- `multer`: 处理文件上传
- `mysql2`: mysql 数据库
- `sequelize`: 一个基于 promise 的 Node.js ORM 工具

#### devDependencies

- `@types/express`: `express` 的类型
- `@types/jsonwebtoken`: `jsonwebtoken` 的类型
- `@types/md5`: `md5` 的类型
- `@types/multer`: `multer` 的类型
- `@types/node`: `node` 的类型
- `terser`: 压缩代码
- `typescript`: 编程语言
- `vite`: 项目构建工具
- `vite-plugin-node`: vite 插件，开启 Node.js 服务器

### 接口文档

- [ecosystem-api](https://apifox.com/apidoc/shared-668841b4-2ff4-4ac5-8674-8a2e9223f54d)
