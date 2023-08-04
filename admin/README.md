# ecosystem-admin

生态系统的控制台

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

- 短横线命名(kebab-case): 文件名, class 类命名, 自定义属性传参
- 帕斯卡命名(PascalCase, 大驼峰命名: CamelCase): 枚举命名, 类型命名
- 小驼峰命名(camelCase): 变量命名, HTML id 属性命名, 自定义属性定参

### 技术栈

- `Vite` + `TypeScript` + `React` + `Less` + `Axios`

### 依赖特性

- `@reduxjs/toolkit`: Redux 工具包
- `antd`: React UI 框架
- `axios`: 接口请求
- `dayjs`: 时间处理工具
- `react`: 前端框架
- `react-dom`: 查看器 DOM 渲染
- `react-redux`: 将 React 连接到 Redux 的连接器
- `react-router-dom`: React 路由
- `@types/node`: `node` 的类型
- `@types/react`: `react` 的类型
- `@types/react-dom`: `react-dom` 的类型
- `@typescript-eslint/eslint-plugin`: 检测和修复 TS 代码,
- `@typescript-eslint/parser`: 解析 TS 代码并生成抽象语法树（AST），以供 eslint 进行代码检查,
- `@vitejs/plugin-react`: Vite 解析 React 文件,
- `eslint`: 代码检查工具,
- `eslint-config-airbnb-base`: airbnb-base 代码编写规范,
- `eslint-config-prettier`: 将 Prettier 规则集成到 ESlint 检查中,
- `eslint-plugin-import`: 检测和修复 JS 中的模块导入导出问题,
- `eslint-plugin-prettier`: 检测不符合 Prettier 格式的代码,
- `eslint-plugin-react`: 检测和修复 react 代码,
- `eslint-plugin-react-hooks`: 检测和修复 react-hooks 代码,
- `less`: CSS 预编译器
  "prettier": "^2.8.8",
- `typescript`: 编程语言
- `vite`: 项目构建工具
- `vite-plugin-eslint`: 将 ESlint 集成到 Vite 中

<!--
http://mineapph5.app.biaov.cn/

管理
- 轮播管理
  - 图片地址：url
  - 跳转页面：pageUrl
  - 展示状态：isShow
- 公告管理
  - 公告标题：title
  - 公告内容：content
  - 展示状态：isShow
- 热点推荐
  - 文章标题：title
  - 封面图：coverUrl
  - 文章内容：content
- 功能列表
  - 功能名称：name
  - 功能平台：tag
  - 功能图标：iconName
  - 页面路径：pageUrl
-->

<!--
首页
功能
  - 扫一扫
  - 图片预览
    - 图片下载
    - 图片分享到微信好友
    - 图片分享到朋友圈
  - 截屏分享
  - 热更新
  - 地理定位
  - 微信授权
  - 登录/注册
我的
-->
