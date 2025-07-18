<template>
  <c-layout-list title="全部商品">
    <template #filter>
      <a-form-item>
        <a-input-group compact>
          <a-select v-model:value="formState.type" :options="goodsSearchEnum.options()" />
          <a-input v-model:value.trim="formState.keyword" placeholder="请输入关键词" />
        </a-input-group>
      </a-form-item>
      <a-form-item>
        <select-category v-model="formState.categoryId" placeholder="商品分类" />
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.onsale" :options="onsaleEnum.options()" placeholder="上架状态" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="setPage">查询</a-button>
        <a-button @click="resetFormState">重置</a-button>
      </a-form-item>
    </template>
    <template #extra>
      <a-button type="primary" href="/goods/add" v-perm="permKey.create">新增商品</a-button>
    </template>
    <template #list>
      <a-table :data-source="data.items" row-key="id" :loading="loading" :pagination="$formatter.pagination(data)" @change="setPage">
        <a-table-column title="商品图">
          <template #="{ record }">
            <a-image :src="record.photos[0]" :width="80" :height="80" />
          </template>
        </a-table-column>
        <a-table-column title="商品名称" data-index="name" ellipsis />
        <a-table-column title="商品分类">
          <template #="{ record }">
            {{ record.category?.name }}
          </template>
        </a-table-column>
        <a-table-column title="价格">
          <template #="{ record }">
            {{ record.defaultPrice.toLocaleString() }}
          </template>
        </a-table-column>
        <a-table-column title="销量">
          <template #="{ record }">
            {{ record.saleNum.toLocaleString() }}
          </template>
        </a-table-column>
        <a-table-column title="上架状态" :width="120">
          <template #="{ record }">
            <a-switch v-model:checked="record.onsale" @change="handleUpdate(record)" v-perm="permKey.update" />
          </template>
        </a-table-column>
        <a-table-column title="更新时间" data-index="updateTime" :width="200" />
        <a-table-column title="操作" :width="180">
          <template #="{ record }">
            <a-space :size="0">
              <a-button type="link" size="small" :href="`/goods/detail/${record.id}`" v-perm="permKey.list">详情</a-button>
              <a-button type="link" size="small" :href="`/goods/edit/${record.id}`" v-perm="permKey.update">编辑</a-button>
              <a-popconfirm placement="left" title="你确定要删除这条数据吗?" @confirm="handleDelete(record)">
                <a-button type="link" size="small" danger v-perm="permKey.delete">删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </a-table>
    </template>
  </c-layout-list>
</template>
<script lang="ts" setup>
import { goodsApi } from '@/api/goods'
import { goodsSearchEnum, onsaleEnum } from './enums'
import SelectCategory from './components/select-category.vue'

interface TableType extends IdDataType {
  onsale: boolean
}
const permKey = definePermission(PermissionKeyEnum.goodsList)
const { formState, onRestFormState, resetFormState } = useFormState({
  type: goodsSearchEnum.name,
  keyword: '',
  categoryId: undefined,
  onsale: undefined
})

const { data, setPage, loading } = usePagingApiRequest(({ current, pageSize }) =>
  goodsApi.paging({
    ...useTransformQuery(formState, { categoryId: (value: number[]) => Number(value.at(-1)) || undefined }, 'search'),
    current,
    pageSize
  })
)

onRestFormState(setPage)

const handleUpdate = async (item: TableType) => {
  await goodsApi.update(item.id, { onsale: item.onsale })
  message.success('操作成功')
}

const handleDelete = async (item: TableType) => {
  await goodsApi.delete(item.id)
  message.success('删除成功')
  setPage()
}
</script>
