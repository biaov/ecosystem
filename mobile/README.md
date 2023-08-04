# ecosystem-app

生态系统的 APP，H5，微信小程序

## 安装依赖

```Basic
npm i
```

## 运行项目

```Basic
npm run dev:%PLATFORM%
```

## 打包项目

```Basic
npm run build:%PLATFORM%
```

## 命名规范

- 短横线命名(kebab-case): 文件名, class 类命名, 自定义属性传参
- 帕斯卡命名(PascalCase, 大驼峰命名: CamelCase): 枚举命名, 类型命名
- 小驼峰命名(camelCase): 变量命名, HTML id 属性命名, 自定义属性定参

## 技术栈

- `Vite` + `TypeScript` + `Vue` + `Less` + `Pinia` + `uni-app`

## 依赖特性

- `@dcloudio/uni-app`: 一份代码编译成不同平台
- `@dcloudio/uni-app-plus`: 解析成 APP
- `@dcloudio/uni-components`: uni-app 组件库
- `@dcloudio/uni-h5`: 解析成 H5
- `@dcloudio/uni-mp-alipay`: 解析成支付宝小程序
- `@dcloudio/uni-mp-weixin`: 解析成微信小程序
- `dayjs`: 时间处理工具
- `pinia`: 状态管理器
- `vue`: 前端框架
- `@dcloudio/types`: `dcloud` 类型声明
- `@dcloudio/uni-automator`: 自动化测试工具
- `@dcloudio/uni-cli-shared`: 公共函数库
- `@dcloudio/uni-stacktracey`: 错误信息收集工具
- `@dcloudio/vite-plugin-uni`: 优化 uni-app 应用程序的构建过程
- `@types/node`: `node` 的类型声明
- `@typescript-eslint/eslint-plugin`: 检测和修复 TS 代码
- `@typescript-eslint/parser`: 解析 TS 代码并生成抽象语法树（AST），以供 eslint 进行代码检查
- `@vitejs/plugin-vue`: Vite 解析 Vue 文件
- `eslint`: 代码检查工具
- `eslint-config-airbnb-base`: airbnb-base 代码编写规范
- `eslint-config-prettier`: 将 Prettier 规则集成到 ESlint 检查中
- `eslint-plugin-import`: 检测和修复 JS 中的模块导入导出问题
- `eslint-plugin-prettier`: 检测不符合 Prettier 格式的代码
- `eslint-plugin-vue`: 检测和修复 Vue 代码
- `less`: CSS 预编译器
- `prettier`: 代码格式化
- `typescript`: 编程语言
- `vite`: 项目构建工具
- `vite-plugin-eslint`: 将 ESlint 集成到 Vite 中

<!--
npm i @dcloudio/uni-app@vue3 @dcloudio/uni-app-plus@vue3 @dcloudio/uni-components@vue3 @dcloudio/uni-h5@vue3 @dcloudio/uni-mp-alipay@vue3 @dcloudio/uni-mp-kuaishou@vue3 @dcloudio/uni-mp-weixin@vue3 @dcloudio/uni-automator@vue3 @dcloudio/uni-cli-shared@vue3 @dcloudio/uni-stacktracey@vue3 @dcloudio/vite-plugin-uni@vue3
-->

<!--
http://mineapph5.app.biaov.cn/
| 登录/注册 | 扫一扫   | 上传图片           | 图片预览         |
| 图片下载  | 特效预览 | 图片分享到微信好友  | 图片分享到朋友圈  |
| 截屏分享  | 热更新   | 地理定位           | 微信授权         |
移动端管理
-->
