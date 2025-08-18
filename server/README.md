# 商城服务端

## 运行

### 安装依赖

```sh
npm i
```

### 运行

- 运行前，需要先配置 [【env】](./.env) 环境变量，并确保数据库（mysql，redis）已运行

```sh
npm start
```

## 打包

- 打包前，推荐配置 `env.production` 环境变量

```sh
npm run build
```

## 部署

- 这里使用的是 docker + pm2 部署
- 参考文章：[docker + nginx + pm2 部署前端项目和后端（nodejs）项目](https://wordpress.biaov.cn/docs/38.html)
