/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `ecosystem-shop` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ecosystem-shop`;

CREATE TABLE IF NOT EXISTS `eco_activity_coupon` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `name` varchar(64) NOT NULL COMMENT '活动名称',
  `startTime` timestamp NOT NULL COMMENT '开始时间',
  `endTime` timestamp NULL DEFAULT NULL COMMENT '结束时间',
  `status` varchar(24) NOT NULL COMMENT '状态, notStart: 未开始, noraml: 进行中, ended: 已结束',
  `setting` json NOT NULL COMMENT '页面设置',
  `desc` text NOT NULL COMMENT '页面描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_coupon` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `code` varchar(24) NOT NULL COMMENT '编码',
  `name` varchar(64) NOT NULL COMMENT '名称',
  `type` varchar(12) NOT NULL COMMENT '类型, cash: 代金券, discount: 折扣券, full: 满减券',
  `value` float(10,2) NOT NULL COMMENT '价值',
  `condition` float(10,2) DEFAULT '0.00' COMMENT '满足条件',
  `startTime` timestamp NOT NULL COMMENT '开始时间',
  `endTime` timestamp NULL DEFAULT NULL COMMENT '结束时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_coupon_rule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `quantity` int NOT NULL COMMENT '发放数量',
  `couponId` int NOT NULL COMMENT '优惠券 ID',
  `distributeCouponId` int DEFAULT NULL,
  `activityCouponId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e12dab7f9a183492409596ffa2e` (`couponId`),
  KEY `FK_dd6c7d87697f0d1cab54573d772` (`distributeCouponId`),
  KEY `FK_1e0e5baebb2d97e9306afc7b066` (`activityCouponId`),
  CONSTRAINT `FK_1e0e5baebb2d97e9306afc7b066` FOREIGN KEY (`activityCouponId`) REFERENCES `eco_activity_coupon` (`id`),
  CONSTRAINT `FK_dd6c7d87697f0d1cab54573d772` FOREIGN KEY (`distributeCouponId`) REFERENCES `eco_distribute_coupon` (`id`),
  CONSTRAINT `FK_e12dab7f9a183492409596ffa2e` FOREIGN KEY (`couponId`) REFERENCES `eco_coupon` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_credit_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `province` varchar(16) DEFAULT NULL COMMENT '省份',
  `city` varchar(16) DEFAULT NULL COMMENT '城市',
  `district` varchar(16) DEFAULT NULL COMMENT '省份',
  `address` varchar(16) DEFAULT NULL COMMENT '详细地址',
  `name` varchar(16) DEFAULT NULL COMMENT '联系人',
  `mobile` varchar(12) DEFAULT NULL COMMENT '手机号',
  `sn` varchar(64) NOT NULL COMMENT '订单号',
  `type` varchar(12) NOT NULL COMMENT '订单类型, entity: 实物商品, virtual: 虚拟商品',
  `status` varchar(16) NOT NULL COMMENT '订单状态, pay: 待支付, paid: 已支付/待发货, shipped: 已发货/待收货, completed: 已完成, cancelled: 已取消',
  `credit` int NOT NULL COMMENT '兑换积分',
  `shippedTime` timestamp NULL DEFAULT NULL COMMENT '发货时间',
  `remark` varchar(128) DEFAULT NULL COMMENT '订单备注',
  `source` varchar(16) NOT NULL COMMENT '订单来源: pc - PC 官网, h5 - H5 端, app - APP 端, miniprogram - 微信小程序端',
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3987e0618df382db5493f457a06` (`userId`),
  CONSTRAINT `FK_3987e0618df382db5493f457a06` FOREIGN KEY (`userId`) REFERENCES `eco_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_credit_order_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `sku` varchar(32) NOT NULL COMMENT '礼品SKU',
  `giftPhoto` varchar(256) NOT NULL COMMENT '图片',
  `giftCredit` int NOT NULL COMMENT '积分',
  `giftName` varchar(64) NOT NULL COMMENT '礼品名称',
  `quantity` int NOT NULL COMMENT '礼品数量',
  `orderId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7e5d8563b774e860166c13d5dc6` (`orderId`),
  CONSTRAINT `FK_7e5d8563b774e860166c13d5dc6` FOREIGN KEY (`orderId`) REFERENCES `eco_credit_order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_decorator` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `key` varchar(16) NOT NULL COMMENT '设置钥匙',
  `value` json NOT NULL COMMENT '设置的值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_distribute_coupon` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `title` varchar(40) NOT NULL COMMENT '发放主题',
  `range` json NOT NULL COMMENT '发放范围',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_gift` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `type` varchar(8) NOT NULL COMMENT '商品类型, entity: 实物商品, invented: 虚拟商品',
  `name` varchar(64) NOT NULL COMMENT '礼品名称',
  `sku` varchar(32) NOT NULL COMMENT 'SKU, 礼品编码',
  `stock` int NOT NULL DEFAULT '0' COMMENT '库存',
  `hold` int NOT NULL DEFAULT '0' COMMENT '库存占用',
  `photos` json NOT NULL COMMENT '礼品图片',
  `recommend` tinyint NOT NULL DEFAULT '0' COMMENT '推荐标签',
  `newest` tinyint NOT NULL DEFAULT '0' COMMENT '新品标签',
  `preferential` tinyint NOT NULL DEFAULT '0' COMMENT '特惠标签',
  `desc` text NOT NULL COMMENT '礼品描述',
  `onsale` tinyint NOT NULL DEFAULT '0' COMMENT '是否上架, true-上架, false-下架',
  `saleNum` int NOT NULL DEFAULT '0' COMMENT '销售数量',
  `credit` int NOT NULL DEFAULT '0' COMMENT '兑换积分',
  `categoryId` int NOT NULL COMMENT '分类ID',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_bc108ad974982af9fe3240a992` (`sku`),
  KEY `FK_a1281aad143b05534bb2383a1d0` (`categoryId`),
  CONSTRAINT `FK_a1281aad143b05534bb2383a1d0` FOREIGN KEY (`categoryId`) REFERENCES `eco_gift_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_gift_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `name` varchar(32) NOT NULL COMMENT '分类名称',
  `sort` int NOT NULL COMMENT '分类排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_goods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `type` varchar(8) NOT NULL COMMENT '商品类型, entity: 实物商品, invented: 虚拟商品',
  `name` varchar(64) NOT NULL COMMENT '商品名称',
  `photos` json NOT NULL COMMENT '商品图片',
  `video` varchar(256) DEFAULT NULL COMMENT '商品视频',
  `desc` text NOT NULL COMMENT '商品描述',
  `onsale` tinyint NOT NULL DEFAULT '0' COMMENT '是否上架, true: 上架, false: 下架',
  `saleNum` int NOT NULL DEFAULT '0' COMMENT '销售数量',
  `defaultPrice` float(10,2) NOT NULL COMMENT '默认价格',
  `defaultSku` varchar(32) NOT NULL COMMENT '默认SKU',
  `categoryId` int NOT NULL COMMENT '分类ID',
  PRIMARY KEY (`id`),
  KEY `FK_ca5be3bfe41b0d96db93fca7594` (`categoryId`),
  CONSTRAINT `FK_ca5be3bfe41b0d96db93fca7594` FOREIGN KEY (`categoryId`) REFERENCES `eco_goods_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

BEGIN;
INSERT INTO `eco_goods` (`id`, `createdAt`, `updatedAt`, `type`, `name`, `photos`, `video`, `desc`, `onsale`, `saleNum`, `defaultPrice`, `defaultSku`, `categoryId`) VALUES
	(1, '2025-09-05 05:48:49', '2025-09-05 05:48:49', 'virtual', '视频会员-免费领取', '["https://ecosystem.biaov.cn/server/uploads/1757051023385dqboe5fshcg.png"]', NULL, '<p>提供海量高清影视资源，独家剧集抢先看，价格为每月0元或年卡0元。 </p><p>包含热门剧集、综艺节目和动漫，价格为每月0元或年卡0元，支持5台设备同时登录。 </p><p>价格为每月0元或年卡0元，性价比高，常有限时活动。 </p><p>每月0元或年卡0元，独家卫视综艺节目。 </p><p>年卡价格为0元，适合喜欢二次元文化的用户。 </p><p>会员服务支持多种设备，方便随时随地观看内容。</p>', 0, 0, 0.00, '17570510941990catlaapgmhk', 1);
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_goods_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `name` varchar(32) NOT NULL COMMENT '分类名称',
  `sort` int NOT NULL COMMENT '分类排序',
  `parentId` int DEFAULT NULL,
  `nsleft` int NOT NULL DEFAULT '1',
  `nsright` int NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`),
  KEY `FK_021ca1bf851ab46f43e5850cfe7` (`parentId`),
  CONSTRAINT `FK_021ca1bf851ab46f43e5850cfe7` FOREIGN KEY (`parentId`) REFERENCES `eco_goods_category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

BEGIN;
INSERT INTO `eco_goods_category` (`id`, `createdAt`, `updatedAt`, `name`, `sort`, `parentId`, `nsleft`, `nsright`) VALUES
	(1, '2025-09-05 05:26:43', '2025-09-05 05:26:43', '会员VIP', 1, NULL, 1, 2);
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_goods_spec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `sku` varchar(32) NOT NULL COMMENT 'SKU',
  `attrs` json NOT NULL COMMENT '属性',
  `photo` varchar(256) NOT NULL COMMENT '图片',
  `price` float(10,2) NOT NULL COMMENT '价格',
  `stock` int NOT NULL DEFAULT '0' COMMENT '库存',
  `hold` int NOT NULL DEFAULT '0' COMMENT '库存占用',
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ddbeceb4bc077d0d9b438cf718` (`sku`),
  KEY `FK_6b6d846c5ace91ac21cb5ae45af` (`productId`),
  CONSTRAINT `FK_6b6d846c5ace91ac21cb5ae45af` FOREIGN KEY (`productId`) REFERENCES `eco_goods` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

BEGIN;
INSERT INTO `eco_goods_spec` (`id`, `createdAt`, `updatedAt`, `sku`, `attrs`, `photo`, `price`, `stock`, `hold`, `productId`) VALUES
	(1, '2025-09-05 05:48:49', '2025-09-05 05:48:49', '17570510941990catlaapgmhk', '[{"label": "数量", "value": "100"}]', 'https://ecosystem.biaov.cn/server/uploads/175705132745399pgp75b69.png', 0.00, 0, 0, 1);
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `nickname` varchar(32) NOT NULL COMMENT '操作人',
  `module` varchar(32) NOT NULL COMMENT '操作模块',
  `ip` varchar(32) NOT NULL COMMENT '操作IP',
  `content` varchar(64) NOT NULL COMMENT '操作内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb3;

BEGIN;
INSERT INTO `eco_log` (`id`, `createdAt`, `updatedAt`, `nickname`, `module`, `ip`, `content`) VALUES
	(14, '2025-09-02 09:29:41', '2025-09-02 09:29:41', '演示', '授权/登录', '118.249.227.155', '登录系统'),
	(15, '2025-09-05 03:46:02', '2025-09-05 03:46:02', '演示', '授权/登录', '175.11.90.112', '登录系统'),
	(16, '2025-09-05 05:20:14', '2025-09-05 05:20:14', '风', '授权/登录', '175.11.90.112', '登录系统'),
	(17, '2025-09-05 05:26:43', '2025-09-05 05:26:43', '风', '商品管理/商品分类', '175.11.90.112', '创建商品分类：'),
	(18, '2025-09-05 05:43:00', '2025-09-05 05:43:00', '风', '授权/登录', '175.11.90.112', '登录系统'),
	(19, '2025-09-05 05:48:49', '2025-09-05 05:48:49', '风', '商品管理/全部商品', '175.11.90.112', '创建商品：视频会员-免费领取'),
	(20, '2025-09-11 05:28:38', '2025-09-11 05:28:38', '风', '授权/登录', '175.11.90.112', '登录系统'),
	(21, '2025-09-11 05:29:43', '2025-09-11 05:29:43', '演示', '授权/登录', '175.11.90.112', '登录系统'),
	(22, '2025-09-22 05:41:13', '2025-09-22 05:41:13', '风', '授权/登录', '175.11.90.112', '登录系统'),
	(23, '2025-09-22 05:50:11', '2025-09-22 05:50:11', '风', '授权/登录', '175.11.90.112', '登录系统'),
	(24, '2025-09-22 05:51:18', '2025-09-22 05:51:18', '风', '权限管理/权限标识', '175.11.90.112', '创建权限标识：'),
	(25, '2025-09-22 05:51:34', '2025-09-22 05:51:34', '风', '权限管理/权限标识', '175.11.90.112', '创建权限标识：官网首页'),
	(26, '2025-09-22 05:51:50', '2025-09-22 05:51:50', '风', '权限管理/权限标识', '175.11.90.112', '创建权限标识：官网分类'),
	(27, '2025-09-22 05:52:12', '2025-09-22 05:52:12', '风', '权限管理/权限标识', '175.11.90.112', '创建权限标识：浏览'),
	(28, '2025-09-22 05:52:41', '2025-09-22 05:52:41', '风', '权限管理/权限标识', '175.11.90.112', '创建权限标识：新增'),
	(29, '2025-09-22 06:05:47', '2025-09-22 06:05:47', '风', '授权/登录', '175.11.90.112', '登录系统'),
	(30, '2025-09-22 06:08:34', '2025-09-22 06:08:34', '风', '权限管理/权限标识', '175.11.90.112', '更新权限标识：创建'),
	(31, '2025-09-22 06:08:47', '2025-09-22 06:08:47', '风', '权限管理/权限标识', '175.11.90.112', '创建权限标识：更新'),
	(32, '2025-09-22 06:10:07', '2025-09-22 06:10:07', '风', '权限管理/权限标识', '175.11.90.112', '创建权限标识：删除'),
	(33, '2025-09-22 06:10:23', '2025-09-22 06:10:23', '风', '权限管理/权限标识', '175.11.90.112', '创建权限标识：浏览'),
	(34, '2025-09-22 06:10:49', '2025-09-22 06:10:49', '风', '权限管理/权限标识', '175.11.90.112', '创建权限标识：创建'),
	(35, '2025-09-22 06:11:02', '2025-09-22 06:11:02', '风', '权限管理/权限标识', '175.11.90.112', '创建权限标识：更新'),
	(36, '2025-09-22 06:24:57', '2025-09-22 06:24:57', '风', '权限管理/角色权限', '175.11.90.112', '分配角色权限：游客'),
	(37, '2025-10-20 09:03:59', '2025-10-20 09:03:59', '风', '授权/登录', '::ffff:127.0.0.1', '登录系统'),
	(38, '2025-10-20 09:04:00', '2025-10-20 09:04:00', '风', '授权/登录', '::ffff:127.0.0.1', '登录系统'),
	(39, '2025-10-20 09:04:20', '2025-10-20 09:04:20', '风', '授权/登录', '::ffff:127.0.0.1', '登录系统'),
	(40, '2025-10-20 09:04:32', '2025-10-20 09:04:32', '风', '授权/登录', '::ffff:127.0.0.1', '登录系统'),
	(41, '2025-10-20 09:04:58', '2025-10-20 09:04:58', '演示', '授权/登录', '::ffff:127.0.0.1', '登录系统'),
	(42, '2025-10-20 09:05:11', '2025-10-20 09:05:11', '演示', '授权/登录', '::ffff:127.0.0.1', '登录系统'),
	(43, '2025-10-20 09:09:54', '2025-10-20 09:09:54', '演示', '授权/登录', '175.11.90.112', '登录系统'),
	(44, '2025-10-20 09:09:58', '2025-10-20 09:09:58', '演示', '授权/登录', '175.11.90.112', '登录系统'),
	(45, '2025-10-20 09:12:43', '2025-10-20 09:12:43', '演示', '授权/登录', '175.11.90.112', '登录系统'),
	(46, '2026-10-15 07:22:27', '2026-10-15 07:22:27', '演示', '授权/登录', '127.0.0.1', '登录系统'),
	(47, '2026-10-15 07:23:37', '2026-10-15 07:23:37', '演示', '授权/登录', '127.0.0.1', '登录系统'),
	(48, '2026-10-15 09:08:20', '2026-10-15 09:08:20', '演示', '授权/登录', '192.168.0.62', '登录系统'),
	(49, '2026-10-15 09:11:07', '2026-10-15 09:11:07', '演示', '授权/登录', '192.168.0.62', '登录系统'),
	(50, '2026-10-15 09:13:27', '2026-10-15 09:13:27', '演示', '授权/登录', '192.168.0.62', '登录系统'),
	(51, '2026-10-15 09:14:50', '2026-10-15 09:14:50', '演示', '授权/登录', '192.168.0.62', '登录系统'),
	(52, '2026-10-15 09:15:26', '2026-10-15 09:15:26', '演示', '授权/登录', '192.168.0.62', '登录系统'),
	(53, '2026-10-15 09:15:28', '2026-10-15 09:15:28', '演示', '授权/登录', '192.168.0.62', '登录系统'),
	(54, '2026-10-15 09:15:29', '2026-10-15 09:15:29', '演示', '授权/登录', '192.168.0.62', '登录系统'),
	(55, '2026-10-15 09:15:39', '2026-10-15 09:15:39', '演示', '授权/登录', '192.168.0.62', '登录系统'),
	(56, '2026-10-15 09:18:55', '2026-10-15 09:18:55', '演示', '授权/登录', '192.168.0.62', '登录系统'),
	(57, '2026-10-15 09:19:17', '2026-10-15 09:19:17', '演示', '授权/登录', '192.168.0.62', '登录系统'),
	(58, '2026-10-15 09:21:14', '2026-10-15 09:21:14', '演示', '授权/登录', '192.168.0.62', '登录系统'),
	(59, '2026-10-15 14:23:17', '2026-10-15 14:23:17', '演示', '授权/登录', '::ffff:211.161.118.26', '登录系统'),
	(60, '2026-10-15 14:25:34', '2026-10-15 14:25:34', '演示', '授权/登录', '::ffff:47.94.148.132', '登录系统'),
	(61, '2026-10-22 03:06:57', '2026-10-22 03:06:57', '演示', '授权/登录', '::ffff:47.94.148.132', '登录系统'),
	(62, '2026-10-22 03:39:40', '2026-10-22 03:39:40', '演示', '授权/登录', '::ffff:47.94.148.132', '登录系统'),
	(63, '2026-10-22 03:41:30', '2026-10-22 03:41:30', '演示', '授权/登录', '::ffff:47.94.148.132', '登录系统'),
	(64, '2026-10-22 03:42:27', '2026-10-22 03:42:27', '演示', '授权/登录', '::ffff:47.94.148.132', '登录系统'),
	(65, '2026-10-22 03:45:09', '2026-10-22 03:45:09', '演示', '授权/登录', '::ffff:47.94.148.132', '登录系统'),
	(66, '2026-10-22 03:50:39', '2026-10-22 03:50:39', '演示', '授权/登录', '::ffff:47.94.148.132', '登录系统'),
	(67, '2026-10-22 03:52:28', '2026-10-22 03:52:28', '演示', '授权/登录', '::ffff:47.94.148.132', '登录系统'),
	(68, '2026-10-22 05:57:42', '2026-10-22 05:57:42', '演示', '授权/登录', '127.0.0.1', '登录系统'),
	(69, '2026-10-22 06:03:17', '2026-10-22 06:03:17', '演示', '授权/登录', '127.0.0.1', '登录系统'),
	(70, '2026-10-22 06:15:44', '2026-10-22 06:15:44', '演示', '授权/登录', '218.77.104.46', '登录系统'),
	(71, '2026-10-22 06:16:20', '2026-10-22 06:16:20', '演示', '授权/登录', '218.77.104.46', '登录系统'),
	(72, '2026-10-22 06:17:13', '2026-10-22 06:17:13', '演示', '授权/登录', '218.77.104.46', '登录系统'),
	(73, '2026-10-22 06:17:18', '2026-10-22 06:17:18', '演示', '授权/登录', '218.77.104.46', '登录系统'),
	(74, '2026-10-22 06:18:43', '2026-10-22 06:18:43', '演示', '授权/登录', '218.77.104.46', '登录系统');
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `name` varchar(32) NOT NULL COMMENT '权限名称',
  `content` varchar(64) NOT NULL COMMENT '权限内容, 模块标识 | 页面标识 | 行为标识',
  `type` varchar(8) NOT NULL COMMENT '权限类型, module:模块 | page:页面 | action:行为',
  `parentId` int DEFAULT NULL,
  `nsleft` int NOT NULL DEFAULT '1',
  `nsright` int NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`),
  KEY `FK_83eaa019a9092e338c32c9ef15d` (`parentId`),
  CONSTRAINT `FK_83eaa019a9092e338c32c9ef15d` FOREIGN KEY (`parentId`) REFERENCES `eco_menu` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb3;

BEGIN;
INSERT INTO `eco_menu` (`id`, `createdAt`, `updatedAt`, `name`, `content`, `type`, `parentId`, `nsleft`, `nsright`) VALUES
	(1, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '仪表面板', 'dashboard', 'page', NULL, 1, 20),
	(2, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '商品管理', 'goods', 'module', NULL, 1, 20),
	(3, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '礼品管理', 'gift', 'module', NULL, 1, 20),
	(4, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '订单管理', 'order', 'module', NULL, 1, 20),
	(5, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '促销活动', 'promotion', 'module', NULL, 1, 20),
	(6, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '用户管理', 'user', 'module', NULL, 1, 20),
	(7, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '权限管理', 'permission', 'module', NULL, 1, 20),
	(8, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '日志管理', 'log', 'module', NULL, 1, 20),
	(9, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '系统设置', 'setting', 'module', NULL, 1, 20),
	(10, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '商品分类', 'category', 'page', 2, 1, 20),
	(11, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '全部商品', 'list', 'page', 2, 1, 20),
	(12, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '商品库存', 'stock', 'page', 2, 1, 20),
	(13, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '礼品分类', 'category', 'page', 3, 1, 20),
	(14, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '全部礼品', 'list', 'page', 3, 1, 20),
	(15, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '购物订单', 'list', 'page', 4, 1, 20),
	(16, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '积分订单', 'credit', 'page', 4, 1, 20),
	(17, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '售后退款', 'sale', 'page', 4, 1, 20),
	(18, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '优惠券', 'coupon', 'page', 5, 1, 20),
	(19, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '活动发券', 'activity-coupon', 'page', 5, 1, 20),
	(20, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '手动发券', 'distribute-coupon', 'page', 5, 1, 20),
	(21, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '全部用户', 'list', 'page', 6, 1, 20),
	(22, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '拉黑名单', 'blocklist', 'page', 6, 1, 20),
	(23, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '权限标识', 'menu', 'page', 7, 1, 20),
	(24, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '角色权限', 'role', 'page', 7, 1, 20),
	(25, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '账号设置', 'account', 'page', 7, 1, 20),
	(26, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '操作日志', 'operation', 'page', 8, 1, 20),
	(27, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '迁移日志', 'migration', 'page', 8, 1, 20),
	(28, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '用户设置', 'user', 'page', 9, 1, 20),
	(29, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '隐私协议', 'protocol', 'page', 9, 1, 20),
	(30, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '订单设置', 'order', 'page', 9, 1, 20),
	(31, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '热搜词设置', 'hotkeyword', 'page', 9, 1, 20),
	(32, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '广告设置', 'adv', 'page', 9, 1, 20),
	(33, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '物流设置', 'express', 'page', 9, 1, 20),
	(34, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 1, 1, 20),
	(35, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 10, 1, 20),
	(36, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 10, 1, 20),
	(37, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 10, 1, 20),
	(38, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '删除', 'delete', 'action', 10, 1, 20),
	(39, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 11, 1, 20),
	(40, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 11, 1, 20),
	(41, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 11, 1, 20),
	(42, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '删除', 'delete', 'action', 11, 1, 20),
	(43, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 12, 1, 20),
	(44, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 12, 1, 20),
	(45, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '下载模板', 'downloadTemplate', 'action', 12, 1, 20),
	(46, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '导入库存', 'importStock', 'action', 12, 1, 20),
	(47, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 13, 1, 20),
	(48, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 13, 1, 20),
	(49, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 13, 1, 20),
	(50, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '删除', 'delete', 'action', 13, 1, 20),
	(51, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 14, 1, 20),
	(52, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 14, 1, 20),
	(53, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 14, 1, 20),
	(54, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '删除', 'delete', 'action', 14, 1, 20),
	(55, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '下载模板', 'downloadTemplate', 'action', 14, 1, 20),
	(56, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '导入库存', 'importStock', 'action', 14, 1, 20),
	(57, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 15, 1, 20),
	(58, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 15, 1, 20),
	(59, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 15, 1, 20),
	(60, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '删除', 'delete', 'action', 15, 1, 20),
	(61, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 16, 1, 20),
	(62, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 16, 1, 20),
	(63, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 16, 1, 20),
	(64, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '删除', 'delete', 'action', 16, 1, 20),
	(65, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 17, 1, 20),
	(66, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 17, 1, 20),
	(67, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 17, 1, 20),
	(68, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '删除', 'delete', 'action', 17, 1, 20),
	(69, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '签收', 'receive', 'action', 17, 1, 20),
	(70, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '退款', 'refund', 'action', 17, 1, 20),
	(71, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 18, 1, 20),
	(72, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 18, 1, 20),
	(73, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 18, 1, 20),
	(74, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '删除', 'delete', 'action', 18, 1, 20),
	(75, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 19, 1, 20),
	(76, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 19, 1, 20),
	(77, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 19, 1, 20),
	(78, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '删除', 'delete', 'action', 19, 1, 20),
	(79, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 20, 1, 20),
	(80, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 20, 1, 20),
	(81, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 21, 1, 20),
	(82, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 21, 1, 20),
	(83, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 22, 1, 20),
	(84, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '拉黑', 'block', 'action', 22, 1, 20),
	(85, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 23, 1, 20),
	(86, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 23, 1, 20),
	(87, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 23, 1, 20),
	(88, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '删除', 'delete', 'action', 23, 1, 20),
	(89, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 24, 1, 20),
	(90, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 24, 1, 20),
	(91, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 24, 1, 20),
	(92, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '删除', 'delete', 'action', 24, 1, 20),
	(93, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '分配权限', 'permission', 'action', 24, 1, 20),
	(94, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 25, 1, 20),
	(95, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 25, 1, 20),
	(96, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 25, 1, 20),
	(97, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '删除', 'delete', 'action', 25, 1, 20),
	(98, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '重置密码', 'reset-pwd', 'action', 25, 1, 20),
	(99, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 26, 1, 20),
	(100, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 26, 1, 20),
	(101, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 26, 1, 20),
	(102, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '删除', 'delete', 'action', 26, 1, 20),
	(103, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 27, 1, 20),
	(104, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 27, 1, 20),
	(105, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 27, 1, 20),
	(106, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '删除', 'delete', 'action', 27, 1, 20),
	(107, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 28, 1, 20),
	(108, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 28, 1, 20),
	(109, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 28, 1, 20),
	(110, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 29, 1, 20),
	(111, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 29, 1, 20),
	(112, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 29, 1, 20),
	(113, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 30, 1, 20),
	(114, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 30, 1, 20),
	(115, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 30, 1, 20),
	(116, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 31, 1, 20),
	(117, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 31, 1, 20),
	(118, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 31, 1, 20),
	(119, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 32, 1, 20),
	(120, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 32, 1, 20),
	(121, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 32, 1, 20),
	(122, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '删除', 'delete', 'action', 32, 1, 20),
	(123, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '浏览', 'list', 'action', 33, 1, 20),
	(124, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '创建', 'create', 'action', 33, 1, 20),
	(125, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '更新', 'update', 'action', 33, 1, 20),
	(126, '2025-08-22 05:17:19', '2025-09-22 06:11:02', '删除', 'delete', 'action', 33, 1, 20),
	(127, '2025-09-22 05:51:18', '2025-09-22 06:11:02', '装修页面', 'decorator', 'module', NULL, 1, 20),
	(128, '2025-09-22 05:51:34', '2025-09-22 06:10:07', '官网首页', 'home', 'page', 127, 2, 11),
	(129, '2025-09-22 05:51:50', '2025-09-22 06:11:02', '官网分类', 'category', 'page', 127, 12, 19),
	(130, '2025-09-22 05:52:12', '2025-09-22 05:52:12', '浏览', 'list', 'action', 128, 3, 4),
	(131, '2025-09-22 05:52:41', '2025-09-22 06:08:34', '创建', 'create', 'action', 128, 5, 6),
	(132, '2025-09-22 06:08:47', '2025-09-22 06:08:47', '更新', 'update', 'action', 128, 7, 8),
	(133, '2025-09-22 06:10:07', '2025-09-22 06:10:07', '删除', 'delete', 'action', 128, 9, 10),
	(134, '2025-09-22 06:10:23', '2025-09-22 06:10:23', '浏览', 'list', 'action', 129, 13, 14),
	(135, '2025-09-22 06:10:49', '2025-09-22 06:10:49', '创建', 'create', 'action', 129, 15, 16),
	(136, '2025-09-22 06:11:02', '2025-09-22 06:11:02', '更新', 'update', 'action', 129, 17, 18);
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `name` varchar(32) NOT NULL COMMENT '名称',
  `timestamp` bigint NOT NULL COMMENT '时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

BEGIN;
INSERT INTO `eco_migrations` (`id`, `createdAt`, `updatedAt`, `name`, `timestamp`) VALUES
	(1, '2025-08-22 05:17:19', '2025-08-22 05:17:19', 'InitData1755480366327', 1755480366327);
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `province` varchar(16) DEFAULT NULL COMMENT '省份',
  `city` varchar(16) DEFAULT NULL COMMENT '城市',
  `district` varchar(16) DEFAULT NULL COMMENT '省份',
  `address` varchar(16) DEFAULT NULL COMMENT '详细地址',
  `name` varchar(16) DEFAULT NULL COMMENT '联系人',
  `mobile` varchar(12) DEFAULT NULL COMMENT '手机号',
  `sn` varchar(64) NOT NULL COMMENT '订单号',
  `type` varchar(12) NOT NULL COMMENT '订单类型, entity: 实物商品, virtual: 虚拟商品',
  `payStatus` varchar(4) NOT NULL DEFAULT 'pay' COMMENT '订单支付状态,  pay: 未支付, paid: 已支付',
  `status` varchar(16) NOT NULL COMMENT '订单状态, pay: 待支付, paid: 已支付/待发货, shipped: 已发货/待收货, completed: 已完成, cancelled: 已取消',
  `totalAmount` float(10,2) NOT NULL COMMENT '总金额',
  `payAmount` float(10,2) NOT NULL COMMENT '支付金额',
  `discountAmount` float(10,2) NOT NULL COMMENT '优惠金额',
  `remark` varchar(128) DEFAULT NULL COMMENT '订单备注',
  `payType` varchar(8) NOT NULL COMMENT '支付方式, wechat - 微信, alipay - 支付宝, blank - 银行卡',
  `payTime` timestamp NULL DEFAULT NULL COMMENT '支付时间',
  `shippedTime` timestamp NULL DEFAULT NULL COMMENT '发货时间',
  `source` varchar(16) NOT NULL COMMENT '订单来源: pc - PC 官网, h5 - H5 端, app - APP 端, miniprogram - 微信小程序端',
  `userId` int DEFAULT NULL,
  `saleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2f6b80788024dfe8425329027d2` (`userId`),
  KEY `FK_d025c8ead197d76a918a1ce9955` (`saleId`),
  CONSTRAINT `FK_2f6b80788024dfe8425329027d2` FOREIGN KEY (`userId`) REFERENCES `eco_user` (`id`),
  CONSTRAINT `FK_d025c8ead197d76a918a1ce9955` FOREIGN KEY (`saleId`) REFERENCES `eco_sale_order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_order_invoice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `type` varchar(8) NOT NULL COMMENT '发票类型, normal: 普通发票, vat: 增值税专用发票',
  `title` varchar(64) NOT NULL COMMENT '发票抬头',
  `no` varchar(64) NOT NULL COMMENT '纳税人识别号',
  `bank` varchar(64) DEFAULT NULL COMMENT '开户行',
  `bankAccount` varchar(64) DEFAULT NULL COMMENT '开户行账号',
  `mobile` varchar(12) DEFAULT NULL COMMENT '手机号',
  `address` varchar(128) DEFAULT NULL COMMENT '地址',
  `orderId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_718986935827097ce8a03a4339` (`orderId`),
  CONSTRAINT `FK_718986935827097ce8a03a43394` FOREIGN KEY (`orderId`) REFERENCES `eco_order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_order_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `sku` varchar(32) NOT NULL COMMENT '商品SKU',
  `goodsPhoto` varchar(256) NOT NULL COMMENT '图片',
  `goodsPrice` float(10,2) NOT NULL COMMENT '价格',
  `goodsName` varchar(64) NOT NULL COMMENT '商品名称',
  `quantity` int NOT NULL COMMENT '商品数量',
  `orderId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5c83ff7385e73a3ad15dff894db` (`orderId`),
  CONSTRAINT `FK_5c83ff7385e73a3ad15dff894db` FOREIGN KEY (`orderId`) REFERENCES `eco_order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_order_trace` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `expressCode` varchar(24) NOT NULL COMMENT '快递编码',
  `expressSn` varchar(64) NOT NULL COMMENT '快递单号',
  `traces` json NOT NULL COMMENT '物流信息',
  `orderId` int DEFAULT NULL,
  `creditOrderId` int DEFAULT NULL,
  `saleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_ad20b01fb367581ab9170268a6` (`orderId`),
  UNIQUE KEY `REL_b166694f422fa6d765c6266a55` (`creditOrderId`),
  KEY `FK_1703ffa0c7e1a7a5c45cf988653` (`saleId`),
  CONSTRAINT `FK_1703ffa0c7e1a7a5c45cf988653` FOREIGN KEY (`saleId`) REFERENCES `eco_sale_order` (`id`),
  CONSTRAINT `FK_ad20b01fb367581ab9170268a6a` FOREIGN KEY (`orderId`) REFERENCES `eco_order` (`id`),
  CONSTRAINT `FK_b166694f422fa6d765c6266a553` FOREIGN KEY (`creditOrderId`) REFERENCES `eco_credit_order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_sale_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `sn` varchar(64) NOT NULL COMMENT '服务单号',
  `type` varchar(64) NOT NULL COMMENT '退款类型, refund: 仅退款, return: 退货退款',
  `status` varchar(16) NOT NULL COMMENT '售后订单状态, normal: 申请中, agreed: 已同意/待发货, receiving: 待签收,refunding: 待退款, refunded: 已退款, rejected: 已拒绝, closed: 已关闭',
  `reason` varchar(64) NOT NULL COMMENT '退款原因',
  `result` varchar(64) DEFAULT NULL COMMENT '拒绝理由',
  `refundAmount` float(10,2) NOT NULL COMMENT '价格',
  `orderId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_4b9e71aaec70b94c49bab04954` (`orderId`),
  KEY `FK_4c3f0004342622ce353a2a3d233` (`userId`),
  CONSTRAINT `FK_4b9e71aaec70b94c49bab049545` FOREIGN KEY (`orderId`) REFERENCES `eco_order` (`id`),
  CONSTRAINT `FK_4c3f0004342622ce353a2a3d233` FOREIGN KEY (`userId`) REFERENCES `eco_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_setting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `key` varchar(16) NOT NULL COMMENT '设置钥匙',
  `value` json NOT NULL COMMENT '设置的值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `password` varchar(64) NOT NULL COMMENT '密码',
  `nickname` varchar(32) NOT NULL COMMENT '昵称',
  `email` varchar(32) DEFAULT NULL COMMENT '邮箱',
  `avatar` varchar(128) DEFAULT NULL COMMENT '头像',
  `mobile` varchar(12) DEFAULT NULL COMMENT '手机号',
  `gender` tinyint NOT NULL DEFAULT '2' COMMENT '性别: 0 - 女, 1 - 男, 2 - 保密',
  `source` varchar(16) NOT NULL COMMENT '注册来源: pc - PC 官网, h5 - H5 端, app - APP 端, admin - PC 管理后台, miniprogram - 微信小程序端',
  `blocklist` tinyint NOT NULL DEFAULT '0' COMMENT '是否黑名单,false-正常,true-拉黑名单',
  `reason` varchar(64) DEFAULT NULL COMMENT '黑名单原因',
  `credit` int NOT NULL DEFAULT '0' COMMENT '用户积分',
  `username` varchar(64) NOT NULL COMMENT '用户名',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ed233c8a0d6e3d440d3631b6aa` (`username`),
  UNIQUE KEY `IDX_e15c2c2f19a5bab7c7c98bbe3d` (`mobile`),
  UNIQUE KEY `IDX_d31198f48124ee419b5922436f` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_user_admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `password` varchar(64) NOT NULL COMMENT '密码',
  `nickname` varchar(32) DEFAULT NULL COMMENT '昵称',
  `email` varchar(32) DEFAULT NULL COMMENT '邮箱',
  `avatar` varchar(128) DEFAULT NULL COMMENT '头像',
  `mobile` varchar(12) DEFAULT NULL COMMENT '手机号',
  `gender` tinyint NOT NULL DEFAULT '2' COMMENT '性别: 0 - 女, 1 - 男, 2 - 保密',
  `source` varchar(16) NOT NULL COMMENT '注册来源: pc - PC 官网, h5 - H5 端, app - APP 端, admin - PC 管理后台, miniprogram - 微信小程序端',
  `roleId` int NOT NULL COMMENT '角色 ID',
  `username` varchar(64) NOT NULL COMMENT '用户名',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_586668ee280721cb94b877a60d` (`username`),
  UNIQUE KEY `IDX_d410412d7391cefe3cf99f7a3c` (`mobile`),
  UNIQUE KEY `IDX_d44300a18f342ef5f896866170` (`email`),
  KEY `FK_7c7a77cc44304538c33eeec2074` (`roleId`),
  CONSTRAINT `FK_7c7a77cc44304538c33eeec2074` FOREIGN KEY (`roleId`) REFERENCES `eco_user_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

BEGIN;
INSERT INTO `eco_user_admin` (`id`, `createdAt`, `updatedAt`, `password`, `nickname`, `email`, `avatar`, `mobile`, `gender`, `source`, `roleId`, `username`) VALUES
	(1, '2025-08-22 13:19:43', '2026-10-22 05:54:09', 'e10adc3949ba59abbe56e057f20f883e', '风', 'biaov@qq.com', 'https://ecosystem.biaov.cn/static/admin.png', '15575148487', 2, 'pc', 1, 'biaov@qq.com'),
	(2, '2025-08-22 05:21:34', '2026-10-22 05:54:09', 'e10adc3949ba59abbe56e057f20f883e', '演示', 'demo@qq.com', 'https://ecosystem.biaov.cn/static/visitor.png', '18888888888', 2, 'pc', 2, 'demo@qq.com');
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_user_coupon` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `status` varchar(24) NOT NULL COMMENT '状态, used: 已使用, expired: 已过期, normal: 未使用',
  `couponId` int NOT NULL COMMENT '优惠券 ID',
  `userId` int NOT NULL COMMENT '用户 ID',
  `orderSn` int DEFAULT NULL,
  `couponRuleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6c7871f9950a1e993f9d71b0133` (`couponId`),
  KEY `FK_83245e4161134c670ca35aadf3a` (`userId`),
  KEY `FK_6ac812a8722bf23b2b726a53783` (`orderSn`),
  KEY `FK_d4ea0d844c8143992b86cc4667c` (`couponRuleId`),
  CONSTRAINT `FK_6ac812a8722bf23b2b726a53783` FOREIGN KEY (`orderSn`) REFERENCES `eco_order` (`id`),
  CONSTRAINT `FK_6c7871f9950a1e993f9d71b0133` FOREIGN KEY (`couponId`) REFERENCES `eco_coupon` (`id`),
  CONSTRAINT `FK_83245e4161134c670ca35aadf3a` FOREIGN KEY (`userId`) REFERENCES `eco_user` (`id`),
  CONSTRAINT `FK_d4ea0d844c8143992b86cc4667c` FOREIGN KEY (`couponRuleId`) REFERENCES `eco_coupon_rule` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS `eco_user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `name` varchar(24) NOT NULL COMMENT '名称',
  `permissions` json DEFAULT NULL COMMENT '权限内容, *,页面:行为,模块:页面:行为',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

BEGIN;
INSERT INTO `eco_user_role` (`id`, `createdAt`, `updatedAt`, `name`, `permissions`) VALUES
	(1, '2025-08-22 05:17:19', '2025-08-22 05:17:19', '超级管理员', '["*"]'),
	(2, '2025-08-22 05:17:19', '2025-09-22 06:24:57', '游客', '["dashboard:list", "goods:category:list", "goods:list:list", "goods:stock:list", "gift:category:list", "gift:list:list", "order:list:list", "order:credit:list", "order:sale:list", "promotion:coupon:list", "promotion:activity-coupon:list", "promotion:distribute-coupon:list", "user:list:list", "user:blocklist:list", "permission:menu:list", "permission:role:list", "permission:account:list", "log:operation:list", "log:migration:list", "setting:user:list", "setting:protocol:list", "setting:order:list", "setting:hotkeyword:list", "setting:adv:list", "setting:express:list", "decorator:home:list", "decorator:category:list"]');
COMMIT;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
