# ecosystem-app

生态系统的 APP，H5，微信小程序

## 安装依赖

```sh
npm i
```

## 运行项目

- 在 `.env.development` 文件中配置环境变量

```sh
npm run dev:%PLATFORM%
```

### 非 H5 平台

- 更改本地请求 IP：`src/config/index.ts`
- 对于 APP 端不能使用 127.0.0.1，所以需要使用本地 IP

## 打包项目

```sh
npm run build:%PLATFORM%
```

## APP 打包 APK

- 方法一：使用 HBuilerX 打包
  - HBuilerX 打开 `dist/build/app` 目录进行打包发行
- 方法二：使用 HBuilderX cli 打包
  - 仍需安装 HBuilerX
  - HBuilerX 登录账号
  - 配置好 cli 环境变量，即 HBuilderX 软件安装目录的 cli.exe
  - 运行 `npm run release` 命令

## 命名规范

- 短横线命名(kebab-case): 文件名, class 类命名, 自定义属性传参
- 帕斯卡命名(PascalCase, 大驼峰命名: CamelCase): 枚举命名, 类型命名
- 小驼峰命名(camelCase): 变量命名, HTML id 属性命名, 自定义属性定参

## 技术栈

- `Vite` + `TypeScript` + `Vue` + `Less` + `Pinia` + `uni-app`

## 依赖特性

### dependencies

- `@dcloudio/uni-app`: 一份代码编译成不同平台
- `@dcloudio/uni-app-plus`: 解析成 APP
- `@dcloudio/uni-components`: uni-app 组件库
- `@dcloudio/uni-h5`: 解析成 H5
- `@dcloudio/uni-mp-alipay`: 解析成支付宝小程序
- `@dcloudio/uni-mp-weixin`: 解析成微信小程序
- `dayjs`: 时间处理工具
- `pinia`: 状态管理器
- `vue`: 前端框架

### devDependencies

- `@dcloudio/types`: `dcloud` 类型声明
- `@dcloudio/uni-automator`: 自动化测试工具
- `@dcloudio/uni-cli-shared`: 公共函数库
- `@dcloudio/uni-stacktracey`: 错误信息收集工具
- `@dcloudio/vite-plugin-uni`: 优化 uni-app 应用程序的构建过程
- `@types/node`: `node` 的类型声明
- `@typescript-eslint/eslint-plugin`: 检测和修复 TS 代码
- `@typescript-eslint/parser`: 解析 TS 代码并生成抽象语法树（AST），以供 eslint 进行代码检查
- `@vitejs/plugin-vue`: Vite 解析 Vue 文件
- `chalk`: 颜色工具
- `eslint`: 代码检查工具
- `eslint-config-airbnb-base`: airbnb-base 代码编写规范
- `eslint-config-prettier`: 将 Prettier 规则集成到 ESlint 检查中
- `eslint-plugin-import`: 检测和修复 JS 中的模块导入导出问题
- `eslint-plugin-prettier`: 检测不符合 Prettier 格式的代码
- `eslint-plugin-vue`: 检测和修复 Vue 代码
- `less`: CSS 预编译器
- `prettier`: 代码格式化
- `typescript`: 编程语言
- `unplugin-auto-import`: 自动引入模块，主要用于全局模块，如 `vue`
- `unplugin-vue-components`: 自动引入并注册组件，主要用于全局组件，如 `src/components`
- `vite`: 项目构建工具
- `vite-plugin-eslint`: 将 ESlint 集成到 Vite 中
