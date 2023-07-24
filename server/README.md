# ecosystem-server

生态系统的服务端

## 安装依赖

```Basic
npm i
```

## 运行项目

```Basic
npm start
```

## 打包项目

```Basic
npm run build
```

### 命名规范

- 短横线命名(kebab-case): 文件名
- 帕斯卡命名(PascalCase, 大驼峰命名: CamelCase): 枚举命名, 类型命名, 类命名
- 小驼峰命名(camelCase): 变量命名

### 技术栈

- `Vite` + `TS` + `Node` + `Express` + `sequelize` + `mysql`

### 依赖特性

- `express`: Node 开发框架
- `jsonwebtoken`: token 生成
- `md5`: 加密库
- `mysql2`: mysql 数据库
- `sequelize`: 一个基于 promise 的 Node.js ORM 工具
- `@types/express`: `express` 的类型
- `@types/jsonwebtoken`: `jsonwebtoken` 的类型
- `@types/md5`: `md5` 的类型
- `@types/node`: `node` 的类型
- `terser`: 压缩代码
- `typescript`: 编程语言
- `vite`: 项目构建工具
- `vite-plugin-node`: vite 插件，开启 Node.js 服务器

### 接口文档

- [ecosystem-api](https://www.showdoc.com.cn/2302761390308442/10396968490372348)
