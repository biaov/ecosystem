# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

`pc/` 是 [ecosystem](https://github.com/biaov/ecosystem) 商城系统（monorepo）的 **PC 网页端**。仓库根目录下另有 `admin`（控制台）、`mobile`（App/H5/小程序）、`server`（NestJS 接口）三个子项目，本目录只负责 PC 端。

技术栈：`Nuxt 4` + `Vue 3` + `TypeScript` + `Less` + `Tailwind CSS 4`（通过 `@tailwindcss/vite`），UI 组件库为作者自研的 `mine-h5-ui`。服务端渲染（`ssr: true`）。

## 常用命令

```sh
npm i                 # 安装依赖（postinstall 会自动执行 nuxt prepare）
npm start             # 启动开发服务（等同 npm run dev，host 0.0.0.0）
npm run dev           # 开发服务，使用 .env.local 环境变量
npm run build         # 生产构建（nuxt build）
npm run generate      # 静态生成（nuxt generate）
npm run preview       # 预览构建产物
```

项目未配置 ESLint / 测试框架，无 lint 与 test 脚本。

## 环境变量

开发脚本 `nuxt dev --dotenv .env.local` 读取 `.env.local`（本地开发配置，被 `.gitignore` 忽略，需自建；仓库里提交的是 `.env`，用于生产构建 `nuxt build`），需自建以下变量：

- `VITE_BASE_URL` — 客户端接口前缀（如 `/api`）
- `VITE_PROXY_BASE_URL` — 服务端地址（Vite 代理目标，同时也是 SSR 直连地址）
- `VITE_DEMO_USERNAME` / `VITE_DEMO_PASSWORD` — 登录页演示账号（预填在表单里）

## 架构概览

Nuxt 源码根目录是 `app/`（Nuxt 4 约定），文件式路由在 `app/pages/`，布局在 `app/layouts/default.vue`（唯一的全局布局，含 header/footer + 滚动容器）。

**自动导入**（`nuxt.config.ts` 的 `imports.dirs` 配置了 `stores`/`enums`/`config` 三个目录，另有 `dayjs` 默认导入与 `mine-h5-ui` 的 `MeToast`）：

- `useStore()`、`useScrollStore()` 来自 `app/stores/`，无需 import
- `app/enums/` 下的枚举（`sourceEnum`、`genderEnum` 等）可直接使用
- `app/config/` 下的 `useConfigThemeColor` 等可直接使用
- `dayjs` 已全局注入，直接调用 `dayjs()`

**关键目录**（非穷尽，仅列需要跨文件理解的部分）：

| 路径 | 作用 |
|------|------|
| `app/api/` | 接口定义层，每个文件用 `useRestful`/`useCommand` 声明一组端点 |
| `app/api/types.ts` | 所有领域数据类型（命名空间 `OrderName`/`UserName`/`CouponName` 等） |
| `app/composables/` | 通用组合式函数（请求、表单、枚举、校验等） |
| `app/stores/` | 全局状态（非 Pinia，用 `reactive` + 组合式函数实现） |
| `app/components/` | 通用组件，命名前缀 `c-`（`c-svg-icon`、`c-dropdown`、`c-goods-list` 等） |
| `app/biz-components/` | 业务组件（`goods-attr`、`email-form`） |
| `app/plugins/` | Nuxt 插件（注册 UI 库、注入全局属性） |
| `app/middleware/auth.global.ts` | 全局路由守卫（登录态跳转） |

## 数据请求层

请求统一封装在 `app/composables/useRequest.ts`，所有 API 文件都基于它声明端点：

- **`useRestful(path)`** — REST 资源端点，返回 `paging`/`all`/`get`/`create`/`delete`/`update`/`replace` 方法。适用于 `pc/goods`、`pc/order`、`pc/cart` 等。
- **`useCommand(path)`** — 命令式端点，返回 `get`/`post`/`update`/`token()` 方法。适用于 `pc/login`、`pc/setting/*` 等。`token()` 生成带 token 的下载/导出链接。
- 底层用 `$fetch`（ofetch）：客户端走 `VITE_BASE_URL`（由 Vite 代理到 `VITE_PROXY_BASE_URL`），SSR 服务端直连 `VITE_PROXY_BASE_URL + VITE_BASE_URL`。
- 请求自动附带 `Authorization: Bearer <token>`（来自 `useStore().state.token`）；响应 `401` 自动登出。
- 接口返回结构为 `{ data }`，`request` 内部已解包，调用方拿到的就是 `data`。

**请求辅助函数**（同文件导出）：

- `useToastRequest(promise, resolve?, message?)` — 带成功/失败 `MeToast` 提示的请求
- `useLoadingRequest(fn)` — 全局请求锁（防重复提交）
- `usePagingApiRequest(request, initialPage, calledOnMounted, showLoading)` — 分页请求，返回 `{ data, getData, loading, page, refresh, setPage }`
- `useApiRequest(request, calledOnMounted, initData, callback)` — 普通请求

分页返回结构为 `PageDataType<T>`（`{ items, total, current, pageSize }`），通用类型定义在 `global.d.ts`。

## 状态管理

`app/stores/` 用的是 **plain `reactive` + 组合式函数**（不是 Pinia）：

- **`useStore()`**（`stores/index.ts`）— 登录态核心。`state` 含 `token`/`userInfo`，持久化到 Nuxt cookie（`token`、`userInfo`）。方法：`login`/`logout`/`isLogin`/`needLogin`/`updateUserInfo`。`state` 以 `readonly` 形式暴露。
- **`useScrollStore()`**（`stores/scroll.ts`）— 页面滚动 + 触底加载，通过 `useTemplateRef('scrollNode')` 绑定布局里的滚动容器，节流调用 `loadMore`。

## 表单与枚举

- **`useFormState(initFormState?)`**（`composables/useFormState.ts`）— 自研表单状态管理：`formState`/`setFormRules`/`validFormState`（校验并 `MeToast` 报错）/`resetFormState`。校验规则用 `FormRule`（`required`/`message`/`validator`/`allowable`），配合 `useValidMobileForm`/`useValidEmailForm`（`composables/useUtils.ts`）使用。
- **`defineEnum(option)`**（`composables/defineEnum.ts`）— 枚举工厂，`app/enums/` 里的枚举都基于它定义，返回带 `options()` 和 `filter()` 的冻结对象。

## 样式约定

- **Tailwind 间距单位是 1px**：`tailwindcss.css` 里 `@theme { --spacing: 1px; }`，因此所有 spacing 工具类直接对应像素值——`p-48` = 48px、`w-500` = 500px、`h-80` = 80px、`gap-24` = 24px。写样式时按像素换算即可。
- 主题色（`primary`/`success`/`warning`/`danger`/`info`/`disabled`）定义在 `app/config/color.ts`，对应的 Less 变量在 `app/styles/vars.less`（`@color-primary` 等，通过 `additionalData` 自动注入到每个 Less 文件）；Tailwind 侧的自定义工具类（`.text-primary`、`.bg-primary` 等）在 `tailwindcss.css`。
- **SVG 图标**：`vite-plugin-svg-icons` 扫描 `app/assets/svgs/`，symbolId 为文件名，用 `<c-svg-icon name="...">` 引用。Ant Design 图标通过 `@ant-design/icons-vue` + `c-ant-icon` 组件使用。
- UI 组件 `me-*` 前缀（`me-input`、`me-button`、`me-tab` 等）来自 `mine-h5-ui`，由 `plugins/mine-h5-ui.ts` 全局注册。

## SSR 注意点

- 项目开启 SSR，需区分客户端/服务端环境：用 `import.meta.client` / `import.meta.server` 判断；`mixin.ts` 插件注入了全局属性 `isClient`（= `import.meta.client`）。
- 涉及 `window`/`localStorage`/`sessionStorage` 的逻辑需做客户端守卫。`utils/storage.ts` 封装了带 `$-` 前缀的 localStorage/sessionStorage 读写（`setStorage`/`getStorage`/`removeStorage`）。
- 登录态用 `useCookie` 而非 localStorage，以保证 SSR 下可读。
