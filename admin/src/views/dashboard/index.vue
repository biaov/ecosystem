<template>
  <a-space direction="vertical" :size="24" class="w-full" v-if="!loading && data">
    <a-card>
      <template #title>
        今日数据
        <span class="text-sm text-info pl-24 font-normal">更新时间：{{ data.updatedAt }}</span>
      </template>
      <a-row class="pb-24">
        <a-col :span="8" v-for="(item, index) in data.list" :key="index">
          <a-statistic v-bind="item">
            <template #suffix>
              <div class="absolute -bottom-20 left-0 text-xs text-info">总：{{ item.total }}</div>
            </template>
          </a-statistic>
        </a-col>
      </a-row>
    </a-card>
    <a-card title="常用功能">
      <div class="flex justify-around">
        <router-link v-for="(item, index) in features" :key="index" :to="{ name: item.routeName }" class="inline-flex flex-col items-center gap-12 py-12 px-24 hover:bg-gray-100">
          <c-svg-icon :name="item.icon" size="30px" :color="item.color" />
          <span class="text-gray-800">{{ item.title }}</span>
        </router-link>
      </div>
    </a-card>
    <a-row :gutter="[24, 24]">
      <a-col :span="24" :xl="12">
        <a-card title="销售趋势图">
          <div ref="saleChartRef" class="h-500"></div>
        </a-card>
      </a-col>
      <a-col :span="24" :xl="12">
        <a-card title="用户趋势图">
          <div ref="userChartRef" class="h-500"></div>
        </a-card>
      </a-col>
      <a-col :span="24">
        <a-card title="技术词">
          <div ref="techStackRef" class="h-500"></div>
        </a-card>
      </a-col>
    </a-row>
  </a-space>
</template>
<script lang="ts" setup>
import { dashboardApi } from '@/api/dashboard'
import type { DashboardName } from '@/api/types'
import { useSaleChart, useUserChart, useTechStackChart } from './hooks'

interface DataType extends DashboardName.DashboardType {
  list: {
    title: string
    value: number
    total: number
  }[]
}

const { saleChartRef, saleRenderData } = useSaleChart()
const { userChartRef, userRenderData } = useUserChart()
const { techStackRef, techStackRenderData } = useTechStackChart()
const { data, loading } = useApiRequest<DataType>(
  async () => {
    const res = await dashboardApi.get<DashboardName.DashboardType>()
    return {
      ...res,
      list: [
        {
          title: '销售额',
          value: res.salesAmount,
          total: res.totalSalesAmount
        },
        {
          title: '成交订单',
          value: res.orderCount,
          total: res.totalOrderCount
        },
        {
          title: '新增用户',
          value: res.userCount,
          total: res.totalUserCount
        }
      ].map(item => ({ ...item, value: item.value.toLocaleString(), total: item.total.toLocaleString() }))
    }
  },
  true,
  null,
  res => {
    saleRenderData(res)
    userRenderData(res)
    techStackRenderData(res)
  }
)

const features = Object.freeze([
  {
    title: '广告设置',
    icon: 'adv',
    routeName: 'setting-adv',
    color: '#ff9d3c'
  },
  {
    title: '全部商品',
    icon: 'goods',
    routeName: 'goods-list',
    color: '#409eff'
  },
  {
    title: '商品库存',
    icon: 'stock',
    routeName: 'goods-stock',
    color: '#ff0f5a'
  },
  {
    title: '购物订单',
    icon: 'order',
    routeName: 'order-list',
    color: '#f56c6c'
  },
  {
    title: '账号设置',
    icon: 'account',
    routeName: 'permission-account',
    color: '#2553ff'
  },
  {
    title: '操作日志',
    icon: 'log',
    routeName: 'log-operation',
    color: '#bf07fd'
  }
])
</script>
