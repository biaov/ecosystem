# ecosystem-admin

生态系统的控制台

## 安装依赖

```sh
npm i
```

## 运行项目

```sh
npm start
```

## 打包项目

```sh
npm run build
```

### 命名规范

- 短横线命名(kebab-case): 文件名, class 类命名, 自定义属性传参
- 帕斯卡命名(PascalCase, 大驼峰命名: CamelCase): 枚举命名, 类型命名
- 小驼峰命名(camelCase): 变量命名, HTML id 属性命名, 自定义属性定参

### 技术栈

- `Vite` + `TypeScript` + `React` + `Less` + `Axios`

### 依赖特性

#### dependencies

- `@reduxjs/toolkit`: Redux 工具包
- `antd`: React UI 框架
- `axios`: 接口请求
- `dayjs`: 时间处理工具
- `react`: 前端框架
- `react-dom`: 查看器 DOM 渲染
- `react-redux`: 将 React 连接到 Redux 的连接器
- `react-router-dom`: React 路由

#### devDependencies

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
- `prettier`: 代码格式化工具
- `typescript`: 编程语言
- `vite`: 项目构建工具
- `vite-plugin-eslint`: 将 ESlint 集成到 Vite 中
