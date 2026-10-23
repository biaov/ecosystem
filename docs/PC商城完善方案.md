# PC 商城完善方案

> 范围：`pc/`（PC 前端）+ `server/src/platform/pc/`（PC 后端）
> 参考：`admin/`（控制台）+ `server/src/platform/admin/`（控制台接口，已初步完成）
> 目标：补齐一个完整商城应有的 PC 端功能，复用现有 admin 的数据模型与后端分层模式。

---

## 1. 现状盘点

### 1.1 PC 前端（`pc/app`）

| 状态 | 页面 / 模块 |
|------|------------|
| ✅ 已实现 | 首页 `index.vue`（轮播 + 商品列表）、分类 `category.vue`、商品详情 `goods/detail/[id].vue`、登录/注册/忘记密码、用户中心框架 `user.vue` + `user/index.vue`、编辑资料/改密码/改邮箱/绑定手机 |
| 🟡 占位 / mock | 购物车 `cart.vue`（**mock 数据**）、确认订单 `confirm-order/[id].vue`（空壳）、我的订单 `user/order.vue`（空）、收货地址 `user/address.vue`（空）、售后 `user/after-sale.vue`（空） |
| ❌ 缺失 | 优惠券中心、礼品/积分商城、搜索页、订单详情、售后申请/详情、发票、物流跟踪、协议页等 |

前端 `app/api/` 层已经**预先声明**了这些接口（`cart`、`order`、`credit-order`、`sale-order`、`confirm-order`、`coupon`、`activity-coupon`、`distribute-coupon`、`gift`、`setting/*`、`dashboard`），但后端尚未实现。

### 1.2 PC 后端（`server/src/platform/pc`）

| 状态 | 模块 |
|------|------|
| ✅ 已实现 | `auth`（登录/注册/忘记密码）、`decorator`（首页/分类装修，只读）、`goods`（商品列表/详情/分类，只读）、`user`（资料/绑定手机/验证邮箱/改密码） |
| ❌ 缺失 | `cart`（购物车）、`order`（下单/列表/详情/支付/取消/确认收货）、`credit-order`（积分兑换）、`sale-order`（售后）、`coupon`（优惠券）、`gift`（礼品）、`address`（收货地址）、`setting`（协议/订单/热搜词/广告/物流等读取） |

### 1.3 Admin（参考，已初步完成）

完整功能清单（对应 `server/src/platform/admin/`）：

- **dashboard** 数据统计
- **goods** 商品管理：列表/详情/增删改/上下架/分类/库存（含模板下载、Excel 批量导入）
- **gift** 礼品管理：列表/详情/增删改/分类/库存（含模板下载、Excel 批量导入）
- **order** 购物订单：列表/详情/发货
- **credit-order** 积分订单：列表/详情/发货
- **sale-order** 售后退款：列表/详情/审核/签收/退款
- **promotion** 促销：优惠券（CRUD + 统计）、活动发券、手动发券
- **user** 用户管理：列表/拉黑/移出黑名单
- **permission / log / setting / decorator** 权限、日志、系统设置、装修

> 关键结论：admin 负责「商品 / 礼品 / 优惠券 / 订单的**后台运营侧**」，PC 负责「**消费者侧**」。admin 的订单模块只有 `发货/审核` 等运营动作，**下单（创建订单）在 admin 和 pc 两端都不存在**，需要新建。

### 1.4 数据模型（`server/src/models`）

已存在（TypeORM 实体）：`UserModel`（含 `blocklist`/`credit` 积分）、`GoodsModel`/`GoodsCategoryModel`/`GoodsSpecModel`（含 `stock`/`hold` 占用）、`OrderModel`（继承 `AddressModel`）/`OrderItemModel`/`OrderTraceModel`/`OrderInvoiceModel`、`CreditOrderModel`/`CreditOrderItemModel`、`SaleOrderModel`、`CouponModel`/`UserCouponModel`/`ActivityCouponModel`/`DistributeCouponModel`/`CouponRuleModel`、`GiftModel`/`GiftCategoryModel`、`DecoratorModel`/`SettingModel`、`LogModel`/`MenuModel`、`UserAdminModel`/`UserRoleModel`。

**缺失实体**：购物车、收货地址簿；（可选）评价、收藏、足迹、积分明细。

---

## 2. 商城完整功能蓝图（一个商城该有的）

| 域 | 功能点 | PC 前端 | PC 后端 |
|----|--------|---------|---------|
| **A. 首页与装修** | 轮播/楼层/广告位 | 部分（读装修配置） | 已实现（decorator） |
| **B. 商品浏览** | 分类导航、商品列表（分页/排序/筛选）、搜索、商品详情（多规格 SKU） | 部分（缺搜索） | 部分（缺排序/热搜词） |
| **C. 购物车** | 加购、改数量、选中/全选、删除、结算 | 🟡 mock | ❌ |
| **D. 下单结算** | 确认订单（地址/优惠券/发票/备注）、提交订单 | 🟡 空壳 | ❌ |
| **E. 支付** | 支付方式选择、支付结果 | ❌ | ❌（模拟支付，对接需自建） |
| **F. 订单管理** | 订单列表（按状态）、订单详情、取消、确认收货、物流跟踪 | 🟡 空 | ❌ |
| **G. 售后服务** | 申请退款/退货、售后进度、撤销 | 🟡 空 | ❌ |
| **H. 优惠券** | 领券中心、我的优惠券、下单用券 | ❌ | ❌ |
| **I. 积分与礼品** | 礼品/积分商城、礼品详情、积分兑换、积分订单 | ❌ | ❌ |
| **J. 用户中心** | 资料/密码/手机/邮箱、收货地址簿 | 部分（缺地址簿） | 部分（缺地址） |
| **K. 营销组件** | 弹窗广告、热搜词、活动落地页 | ❌ | ❌（读 setting） |
| **L. 内容合规** | 用户协议、隐私协议、关于我们 | 部分（aboutus 有） | ❌（读 setting） |

---

## 3. 差距分析（按优先级）

| 优先级 | 模块 | 现状 | 要做的 |
|--------|------|------|--------|
| P0 | 收货地址 `address` | 前后端均无 | 新建实体 + CRUD 接口 + 地址簿页面 |
| P0 | 购物车 `cart` | 前端 mock、后端无 | 新建实体 + 加购/列表/改量/删除 + 购物车页 |
| P0 | 下单/结算 `confirm-order` + `order` | 前端空壳、后端无 | 新建「确认订单 → 提交订单 → 支付」完整链路 |
| P0 | 订单管理 `order` | 前端空、后端无 | 订单列表/详情/取消/确认收货 |
| P0 | 积分兑换 `gift` + `credit-order` | 前后端均无 | 礼品列表/详情 + 积分下单 |
| P1 | 售后 `sale-order` | 前端空、后端无 | 售后申请/列表/详情/撤销（后端审核逻辑 admin 已有） |
| P1 | 优惠券 `coupon` | 前后端均无 | 领券中心、我的优惠券、下单用券 |
| P1 | 设置读取 `setting` | 前端已声明、后端无 | 读协议/订单/热搜词/广告/物流/用户设置 |
| P2 | 搜索、排序、热搜词 | 前端缺 | 商品搜索接口 + 搜索页 + 热搜词 |
| P2 | 营销组件（广告/活动页） | 前端缺 | 弹窗广告、活动落地页 |

---

## 4. 后端方案（`server/src/platform/pc`）

新增模块均按现有 `controller / service / dto / module` 四件套组织，放在 `server/src/platform/pc/<feature>/` 下，由 `route.module.ts` 的 `import.meta.glob` 自动注册，路由前缀为 `/api/pc/<feature>`。鉴权用 `@UseGuards(AuthGuard)`（前端用户），下单等敏感操作复用已有公共工具（`useTransformQuery` / `useAffected` / `findAndCount` / `getPageQuery` / `useParseToken` / `BizException` 等，均全局可用）。

### 4.1 收货地址 `address`（P0，全新）

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `pc/address` | 我的地址列表（分页） |
| POST | `pc/address` | 新增地址 |
| PATCH | `pc/address/:id` | 更新地址 |
| DELETE | `pc/address/:id` | 删除地址 |
| POST | `pc/address/:id/default` | 设为默认地址 |

前端用 `useRestful('pc/address')`。

### 4.2 购物车 `cart`（P0，全新）

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `pc/cart` | 我的购物车（含商品快照、库存、是否选中） |
| POST | `pc/cart` | 加入购物车（`{ goodsId, sku, quantity }`） |
| PATCH | `pc/cart/:id` | 修改数量 / 选中态 |
| DELETE | `pc/cart/:id` | 删除 |
| POST | `pc/cart/select-all` | 全选/取消全选 |

前端 `cartApi = useRestful('pc/cart')` 已声明。

### 4.3 下单与结算（P0，核心链路）

参考前端已声明的 `confirmOrderApi = useRestful('pc/confirm-order')` 与 `orderApi = useRestful('pc/order')`。

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `pc/confirm-order` | 创建结算单（`{ items: [{ id: goodsId, sku, quantity }] }`），校验库存、计算金额，返回结算单 id |
| GET | `pc/confirm-order/:id` | 结算单详情（商品明细 + 可用优惠券 + 地址 + 合计） |
| POST | `pc/order` | 提交订单（`{ confirmOrderId, addressId, couponId?, invoice?, remark?, payType }`），落库生成正式订单并**占用库存 + 核销优惠券** |
| GET | `pc/order` | 我的订单列表（按 status 分页） |
| GET | `pc/order/:id` | 订单详情（含 items/trace/invoice） |
| POST | `pc/order/:id/cancel` | 取消订单（释放库存 + 退回优惠券） |
| POST | `pc/order/:id/pay` | 模拟支付（`payType`），`pay → paid` |
| POST | `pc/order/:id/receive` | 确认收货，`shipped → completed` |

> 支付说明：README 明确「项目不包含第三方对接，如微信支付…需自行对接」。此处 `pay` 先做**模拟支付**（直接改 `payStatus/status`），保留 `payType`（wechat/alipay/bank）作为扩展点。

### 4.4 积分与礼品（P0）

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `pc/gift` | 礼品列表（仅上架，支持标签 recommend/newest/preferential） |
| GET | `pc/gift/:id` | 礼品详情 |
| GET | `pc/gift-category` | 礼品分类 |
| POST | `pc/credit-order` | 积分兑换下单（`{ giftId, quantity, addressId, remark }`），校验积分、扣积分、扣库存 |
| GET | `pc/credit-order` | 我的积分订单列表 |
| GET | `pc/credit-order/:id` | 积分订单详情 |
| POST | `pc/credit-order/:id/cancel` | 取消（退回积分/库存） |

### 4.5 售后服务 `sale-order`（P1）

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `pc/sale-order` | 发起售后（`{ orderId, type: refund/return, reason }`），生成 `SaleOrder`，状态 `normal` |
| GET | `pc/sale-order` | 我的售后列表 |
| GET | `pc/sale-order/:id` | 售后详情 |
| POST | `pc/sale-order/:id/cancel` | 撤销售后（`normal → closed`） |

> 审核/签收/退款逻辑 admin 已实现（`admin/sale-order` 的 `examine/receive/refund`），PC 只需「发起 + 查询 + 撤销」。

### 4.6 优惠券 `coupon`（P1）

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `pc/activity-coupon` | 领券中心（进行中的活动） |
| GET | `pc/activity-coupon/:id` | 活动详情（含券规则） |
| POST | `pc/activity-coupon/:id/claim` | 领取优惠券（按 `CouponRule` 生成 `UserCoupon`） |
| GET | `pc/coupon` | 我的优惠券（按 status：normal/used/expired） |
| GET | `pc/coupon/available` | 结算页可用优惠券（按订单金额匹配） |

> 发券的「定向发放 / 手动发券」由 admin 完成（`distribute-coupon`）；PC 侧补「用户主动领取」入口即可。

### 4.7 设置读取 `setting`（P1）

只读接口，返回对应 key 的 `value`（JSON）：

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `pc/setting/protocol` | 隐私/用户协议 |
| GET | `pc/setting/order` | 订单设置（`cancelTime` 分钟 / `receiptTime` 天，下单/售后联动） |
| GET | `pc/setting/hotkeyword` | 热搜词 |
| GET | `pc/setting/adv` | 弹窗广告 |
| GET | `pc/setting/express` | 物流设置 |
| GET | `pc/setting/user` | 用户设置 |

### 4.8 商品增强（P2）

在现有 `pc/goods` 上扩展：`name`/`categoryId` 筛选已支持，补充 `sort`（价格/销量/上新排序）、`price` 区间筛选，配合 `hotkeyword` 做搜索联想。

---

## 5. 前端方案（`pc/app`）

复用现有约定（`useRestful`/`useCommand` 声明接口、`useFormState` 表单、`usePagingApiRequest` 分页、`c-*` 组件、`me-*` UI 组件、Tailwind `--spacing: 1px`）。

| 页面 | 文件 | 内容 |
|------|------|------|
| 购物车 | 完善 `cart.vue` | 接 `pc/cart`，去掉 mock，选中/全选/改量/删除/结算 |
| 确认订单 | 完善 `confirm-order/[id].vue` | 地址选择、优惠券选择、发票、备注、支付方式、提交 |
| 我的订单 | 完善 `user/order.vue` | 状态 Tab + 列表 + 详情 + 取消/确认收货 |
| 订单详情 | 新增 `user/order/[id].vue` | 订单信息、物流跟踪、售后入口 |
| 收货地址 | 完善 `user/address.vue` + 新增编辑弹窗/页 | 地址簿 CRUD + 默认地址 |
| 售后 | 完善 `user/after-sale.vue` + 新增申请/详情页 | 售后申请、进度、撤销 |
| 礼品/积分商城 | 新增 `gift.vue` + `gift/[id].vue` | 礼品列表/详情/积分兑换 |
| 积分订单 | 新增 `user/credit-order.vue` | 积分订单列表/详情 |
| 领券中心 | 新增 `coupon.vue` | 活动列表 + 领取 |
| 我的优惠券 | 新增 `user/coupon.vue` | 我的券列表（状态 Tab） |
| 搜索 | 新增 `search.vue` | 商品搜索 + 热搜词 |
| 协议页 | 新增 `protocol.vue`（或 aboutus 内嵌） | 读 `pc/setting/protocol` |

---

## 6. PC 样式方案（设计规范）

> **现状**：`pc/app` 采用 **Tailwind CSS 4**（`@tailwindcss/vite`，`@theme { --spacing: 1px }`）+ **scoped Less**（`vars.less` 经 `additionalData` 自动注入每个 Less 文件）+ **mine-h5-ui** 组件库（`me-*`，H5 移动端组件库，PC 端需抹圆角适配）+ **Ant Design 图标**（`@ant-design/icons-vue`，`c-ant-icon`）+ 本地 SVG（`c-svg-icon`）。样式文件集中在 `app/styles/`（`reset.less` / `vars.less` / `tailwindcss.css`）与 `app/config/color.ts`。
>
> **基调**：**简洁电商风** —— 浅灰底 `#f5f5f5` + 白色直角卡片 + 蓝色主色 `#409eff`（Element UI 蓝）+ 轻阴影 + 低饱和辅助色，与 admin 控制台视觉一致。

### 6.1 颜色体系（Design Token）

行为色在 **三处** 同步维护，任一改动必须三处同步，避免漂移：

| 位置 | 作用 |
|------|------|
| `app/config/color.ts` | JS 侧颜色（`useConfigThemeColor`，用于枚举 option 的 `color` 内联样式） |
| `app/styles/vars.less` | Less 变量（`additionalData` 注入，scoped 样式中用 `@color-*`） |
| `app/styles/tailwindcss.css` | Tailwind 工具类（`.text-primary` / `.bg-primary` / hover 变体） |

Token 表：

| Token | 值 | 用途 |
|-------|----|------|
| `primary` | `#409eff` | 主色 / 品牌蓝 / 按钮 / 链接 |
| `success` | `#67c23a` | 成功 / 进行中 |
| `warning` | `#e6a23c` | 警告 / 待处理 |
| `danger` | `#f56c6c` | 危险 / **价格** / 促销红 / 必填星号 |
| `info` | `#909399` | 次要文字 / 占位 |
| `disabled` | `rgba(0,0,0,0.25)` | 禁用 |
| 文本主 | `rgba(0,0,0,0.65)` | 正文（reset.less） |
| 文本强调 | `#333` | 标题 / 导航 |
| 页面底 | `#f5f5f5` | 页面背景（reset.less） |
| 卡片底 | `#fff` | 卡片 / 弹层 |
| 分割线 | `#e5e5e5` | 边框 / 分割线 |

**整改项**：
1. `disabled` 两处不一致（`color.ts` 为 `0.25`、`vars.less` 为 `0.2`）→ 统一 `rgba(0,0,0,0.25)`。
2. `.text-special`（`#722ed1`）仅存在于 `tailwindcss.css`，未进 `color.ts`/`vars.less` → 保留则三处补齐，否则删除。
3. **禁混 Tailwind 默认色板**：现有 `text-blue-400`/`bg-blue-50`/`text-gray-900`/`text-gray-500`/`border-red-400`/`text-red-500` 等与品牌蓝（`#409eff`）不一致 → 统一改为语义 token：`text-blue-400 → text-primary`、`text-red-500 → text-danger`、`text-gray-900/800/950 → text-[#333]`（或 `font-bold` 强调）、`text-gray-400/500 → text-info`、`border-gray-200/300 → border-[#e5e5e5]`。

### 6.2 间距与尺寸

`@theme { --spacing: 1px }` 使 **Tailwind 间距 = 1px**（仅影响 `p/m/w/h/gap/inset` 等 spacing 工具，`text-*` 字号走 `--text-*` 刻度、不受影响）。按像素直写：`p-48`=48px、`gap-24`=24px、`w-500`=500px。

常用档位：

| 档位 | 值(px) | 典型用途 |
|------|--------|---------|
| xs | 8 | 图标与文字间距、紧凑内边距 |
| sm | 12 | 列表项间距、图标间距 `gap-12` |
| md | 24 | 卡片间距、区块内边距 `gap-24`/`p-24` |
| lg | 48 | 卡片留白 `p-48`、大区块间距 |
| xl | 80 | 顶栏高 `h-80`、首屏留白 |

### 6.3 排版

| 层级 | 类 | 字号 | 用途 |
|------|-----|------|------|
| 页面大标题 | `text-6xl font-bold` | 60px | 购物车 / 结算等独立页头 |
| 区块标题 | `text-3xl font-bold` | 30px | 模块标题（`c-goods-list` title） |
| 卡片标题 | `text-2xl font-bold` | 24px | 商品名、用户中心标题 |
| 正文强调 | `text-base font-bold` | 16px | 列表项名称 |
| 正文 | `text-sm` | 14px | 描述、价格、表单 |
| 次要 | `text-xs text-info` | 12px | 脚注、辅助信息 |

价格统一 `text-danger font-bold` + `¥` 符号（`¥<span class="text-2xl">120.58</span>`）。

### 6.4 布局规范

- **全局骨架**（`layouts/default.vue`）：固定顶栏 `h-80`（80px，滚动后白底阴影）+ `main` 自适应 + 页脚；根滚动容器 `ref="scrollNode"` 供 `useScrollStore` 触底加载。
- **主内容容器**：统一 `w-1200 mx-auto`（1200px 定宽居中，商品列表 / 分类 / 购物车已用）；**整改** 商品详情 `w-[80%]`、用户中心 `w-[90%]` → 统一 1200px（可抽 `.container` 工具类复用）。
- **卡片**：`bg-white` + 留白 `p-48` + `shadow-md`（hover `shadow-lg`），圆角 **0**（直角）。
- **用户中心**：左 `w-300` 侧边栏 + 右 `flex-1` 内容（`user.vue` 已定），子页卡片 `bg-white p-48`。

### 6.5 组件与交互约定

| 层 | 前缀 | 说明 |
|----|------|------|
| UI 组件 | `me-*` | mine-h5-ui：`me-button`/`me-input`/`me-checkbox`/`me-stepper`/`me-divider`/`me-empty`/`me-tab`/`me-dialog`/`me-form`/`me-swiper` 等 |
| 通用组件 | `c-*` | `c-svg-icon`/`c-ant-icon`/`c-dropdown`/`c-goods-list`/`c-goods-item`/`c-swiper`/`c-captcha`/`c-upload` 等 |
| 业务组件 | `biz-*` | `goods-attr`（SKU 选择）、`email-form` |

- **圆角**：整体直角。`me-*` 组件默认带圆角，用 `border-radius="0"`（prop）或 `rounded-[0]!` 抹平；建议抽统一 `me-button` 包装组件，避免散落 `!important`。
- **hover / 过渡**：可点元素加 `cursor-pointer` + `transition`（`duration-300`）；色变统一 `hover:text-primary` / `hover:bg-primary`，浮起 `hover:shadow-lg`。
- **图标**：本地图标放 `app/assets/svgs/`（当前仅 `email.svg`），用 `<c-svg-icon name="...">`；Ant 图标用 `<c-ant-icon name="XxxOutlined" type="primary|success|info|warning|danger|disabled|white">`（`type` 已映射行为色）。
- **表单**：`useFormState` + `me-input`/`me-form`，校验失败 `MeToast` 报错；必填星号用 `text-danger`。

### 6.6 响应式

PC 端为主，现仅有 `max-[1920px]`（用户中心卡片超大屏回退）一处断点。建议分级：

- `≥ 1280px`：`w-1200 mx-auto` 定宽居中；
- `768–1279px`：容器改 `w-full px-24`，用户中心侧边栏折叠；
- `< 768px`：非本期重点（H5 由 `mobile` 子项目承接），仅保证不横向溢出。

### 6.7 待整改清单

| # | 问题 | 现状 | 建议 |
|---|------|------|------|
| 1 | 内容容器宽度不一 | `w-1200` / `w-[80%]` / `w-[90%]` | 统一 `w-1200 mx-auto`，抽 `.container` |
| 2 | 混用 Tailwind 默认色 | `text-blue-400`/`bg-blue-50`/`text-gray-900`/`text-red-500` 等散落各页 | 替换为语义 token（6.1 整改项 3） |
| 3 | `disabled` 值漂移 | `color.ts` `0.25` vs `vars.less` `0.2` | 统一 `rgba(0,0,0,0.25)` |
| 4 | `.text-special` 孤儿 token | 仅 `tailwindcss.css` | 三处补齐或删除 |
| 5 | `bg-radial` 彩虹渐变 | `tailwindcss.css` 残留 | 非商城风格，确认后删除 |
| 6 | `!important` 硬覆盖 hover | `hover:bg-danger:hover` 等 | 改语义类 / 统一包装组件 |
| 7 | 本地 SVG 稀缺 | 仅 `email.svg` | 补常用图标，或直接用 Ant 图标 |
| 8 | 字号层级松散 | 标题 `2xl/3xl/6xl` 混用 | 按 6.3 收敛 |

---

## 7. 数据模型补充

需要新增两个实体（放在 `server/src/models/` 下，沿用 `BaseModel`）：

### 7.1 收货地址簿 `UserAddressModel`

```ts
@Entity('user_address')
export class UserAddressModel extends AddressModel { // 复用 AddressModel 的省/市/区/详细地址/姓名/手机
  @Column({ comment: '用户 ID' })
  userId: number

  @Column({ comment: '是否默认', default: false })
  isDefault: boolean

  @ManyToOne(() => UserModel, user => user.addresses)
  @JoinColumn()
  user: Relation<UserModel>
}
```

`UserModel` 增加 `@OneToMany(() => UserAddressModel, addr => addr.user) addresses`。

### 7.2 购物车 `CartModel`

```ts
@Entity('user_cart')
export class CartModel extends BaseModel {
  @Column({ comment: '用户 ID' })
  userId: number

  @Column({ comment: '商品 ID' })
  goodsId: number

  @Column({ length: 32, comment: 'SKU' })
  sku: string

  @Column({ comment: '数量', default: 1 })
  quantity: number

  @Column({ comment: '是否选中', default: true })
  checked: boolean

  @ManyToOne(() => UserModel, user => user.carts)
  @JoinColumn()
  user: Relation<UserModel>
}
```

### 7.3 可选（P2，视需求）

- `GoodsReviewModel` 商品评价（订单完成后评价）
- `UserFavoriteModel` 收藏、`UserFootprintModel` 足迹
- `CreditRecordModel` 积分明细（兑换/发放/退还流水，`UserModel.credit` 的账本）

---

## 8. 关键流程与状态机

### 8.1 购物订单状态（枚举已存在 `OrderStatusEnum`）

```
pay(待支付) ──pay──> paid(待发货) ──admin发货──> shipped(待收货) ──receive──> completed(已完成)
   │                                                          │
   └────────cancel / 超时(定时任务)────────> cancelled(已取消) ─┘
```

- 超时取消已由 `modules/schedule/order.service.ts` 定时任务处理（依赖 `setting.order` 的 `cancelTime`/`receiptTime`），下单时只需保证**取消时释放库存与优惠券**。
- **库存**：`GoodsSpecModel` 有 `stock`（可售）+ `hold`（占用）。下单 `hold += qty`（防超卖）；支付成功 `stock -= qty, hold -= qty`；取消/超时 `hold -= qty`。礼品 `GiftModel` 同理。

### 8.2 售后状态（枚举 `SaleOrderStatusEnum`）

```
normal(申请中) ──admin同意──> agreed(待发货) ──> receiving(待签收) ──> refunding(待退款) ──> refunded(已退款)
     │                                                                    │
     └──admin拒绝──> rejected(已拒绝)        └──撤销──> closed(已关闭)
```

仅退款（`refund`）时 `normal → refunding`；退货退款（`return`）走完整 `agreed → receiving → refunding`。

### 8.3 优惠券状态（枚举 `UserCouponStatusEnum`）

`normal(未使用) → used(已使用) / expired(已过期)`。下单核销时 `status=used` 并回填 `orderSn`；取消订单退回为 `normal`。

### 8.4 下单事务要点

提交订单需在一个事务内完成：① 校验并占用库存（`hold`）；② 生成 `Order` + `OrderItem`；③ 核销优惠券；④ 扣减积分（积分兑换时）。失败需回滚。当前 `Order` 的金额字段为 `totalAmount`（总价）/`payAmount`（实付）/`discountAmount`（优惠），下单时按「商品金额 − 优惠券 − 积分」计算。

---

## 9. 实施路线

| 阶段 | 内容 | 依赖 |
|------|------|------|
| **Phase 1（P0 基础交易闭环）** | 收货地址、购物车、确认订单 + 提交订单 + 模拟支付、订单列表/详情/取消/收货、积分兑换（礼品 + 积分订单） | 新增 2 个实体（address/cart） |
| **Phase 2（P1 交易增强）** | 售后申请/查询/撤销、优惠券（领券中心 + 我的券 + 下单用券）、设置读取（协议/广告/热搜词） | Phase 1 的 order |
| **Phase 3（P2 体验优化）** | 商品搜索/排序/热搜词、营销组件（弹窗广告、活动落地页）、协议页 | Phase 2 的 setting |
| **Phase 4（P2 可选扩展）** | 评价、收藏、足迹、积分明细账本 | 独立 |

每阶段后端按「实体 → DTO → Service → Controller → 路由」顺序实现，前端按「api 声明 → 页面 → 组件」实现，并同步补 `global.d.ts` / `app/api/types.ts` 中的类型定义。
