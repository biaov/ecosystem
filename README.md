# ecosystem

一个简单的商城系统，包含 `PC 网站`，`APP`，`H5`，`微信小程序`，`控制台`，`服务端` 😄

<h2 align="center">
  <a href="https://github.com/biaov/ecosystem"><img src="https://shields.io/github/v/release/biaov/ecosystem.svg?logo=github&label=version" alt="version" /></a>
  <a href="https://github.com/biaov/ecosystem/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="LICENSE" /></a>
</h2>

## 特性

- 购物流程
- 登录注册
- 用户管理
- 礼品管理
- 商品管理
- 订单管理
- 促销管理
- 账号/权限管理
- 基础设置

## 技术栈

- `PC 网站`: `NuxtJs` + `Vue3.x` + `TypeScript` + `Less` + `Tailwindcss`
- `APP/H5/微信小程序`: `Vite` + `Uni-App` + `Vue3.x` + `TypeScript` + `Less` + `Tailwindcss` + `UView-plus`
- `控制台`: `Vite` + `Vue3.x` + `TypeScript` + `Less` + `Ant Design Vue` + `Tailwindcss`
- `服务端`: `Vite` + `Node.js` + `NestJs` + `MySQL` + `TypeScript`

## 项目结构

- `pc`: 商城的 PC 网页
- `admin`: PC + Mobile 的控制台
- `mobile`: APP, H5, 微信小程序
- `server`: PC 网页，控制台和 Mobile 的接口
- `README.md`: 项目文档

## 演示地址

- [PC 端](http://ecosystem.biaov.cn/)
- [控制台](http://ecosystem.biaov.cn/admin/)
- [服务端接口文档](https://apifox.com/apidoc/shared/1058a6ee-8362-4b19-b74b-83fe690625fd)
- [APP](https://github.com/biaov/ecosystem/releases)
- [H5](http://ecosystem.biaov.cn/h5)
- 小程序: 本地开发者工具运行

## 项目启动

### 下载项目

```sh
git clone https://github.com/biaov/ecosystem.git --depth=1
```

### 项目运行文档

- [PC 端](https://github.com/biaov/ecosystem/blob/main/pc/README.md)
- [控制台](https://github.com/biaov/ecosystem/blob/main/admin/README.md)
- [移动端](https://github.com/biaov/ecosystem/blob/main/mobile/README.md)
- [服务端](https://github.com/biaov/ecosystem/blob/main/server/README.md)

#### 注意事项

> [!WARNING]
> 项目不包含第三方对接，如 `微信支付`、`云存储`、`短信验证` 等，需自行对接。

## 贡献者们

[![贡献者们](https://contrib.rocks/image?repo=biaov/ecosystem)](https://github.com/biaov/ecosystem/graphs/contributors)
