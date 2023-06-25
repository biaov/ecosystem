# ecosystem

一个简单的生态系统，包含 app，h5，小程序，控制台，服务端

<h2 align="center">
  <a href="https://github.com/biaov/ecosystem"><img src="https://img.shields.io/badge/version-v1.0.0-blue" /></a>
  <a href="https://github.com/biaov/ecosystem/blob/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" /></a>
</h2>

## 项目结构

- `admin`: `vite + react` 控制台
- `app`: `vite + uni-app`，包含 app, h5, 小程序
- `server`: `vite + node` 服务端，包含控制台和 app 的接口

## 项目启动

### 下载项目

```sh
git clone https://github.com/biaov/ecosystem.git --depth=1
```

### 安装对应依赖

#### 安装控制台依赖

```sh
cd admin
npm i
```

#### 安装 app 依赖

```sh
cd app
npm i
```

#### 安装服务端依赖

```sh
cd server
npm i
```

### 运行项目

```sh
npm start
```

### 打包项目

```sh
npm run build
```

## 贡献者们

[![贡献者们](https://contrib.rocks/image?repo=biaov/ecosystem)](https://github.com/biaov/ecosystem/graphs/contributors)
