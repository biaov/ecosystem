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
        <a-select v-model:value="formState.onsale" :options="onsaleEnum.options()" placeholder="上下架" />
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
        <a-table-column title="商品图" :width="120">
          <template #="{ record }">
            <a-image :src="record.photos[0]" :width="80" :height="80" />
          </template>
        </a-table-column>
        <a-table-column title="商品名称" data-index="name" :width="240" ellipsis />
        <a-table-column title="商品分类">
          <template #="{ record }">
            {{ record.category?.name }}
          </template>
        </a-table-column>
        <a-table-column title="价格" :width="120">
          <template #="{ record }">
            {{ record.price.toLocaleString() }}
          </template>
        </a-table-column>
        <a-table-column title="已售" :width="120">
          <template #="{ record }">
            {{ record.price.toLocaleString() }}
          </template>
        </a-table-column>
        <a-table-column title="操作内容" data-index="content" ellipsis />
        <a-table-column title="操作IP" data-index="ip" :width="180" />
        <a-table-column title="操作时间" data-index="createdAt" :width="180" />
      </a-table>
    </template>
  </c-layout-list>
</template>
<script lang="ts" setup>
import { goodsApi } from '@/api/goods'
import { goodsSearchEnum, onsaleEnum } from './enums'
import SelectCategory from './components/select-category.vue'

const permKey = definePermission(PermissionKeyEnum.goodsList)
const { formState, onRestFormState, resetFormState } = useFormState({
  type: goodsSearchEnum.name,
  keyword: '',
  categoryId: [],
  onsale: undefined
})

const { data, setPage, loading } = usePagingApiRequest(({ current, pageSize }) =>
  goodsApi.paging({
    ...useTransformQuery(formState, { categoryId: (value: number[]) => value.at(-1) }, 'search'),
    current,
    pageSize
  })
)

onRestFormState(setPage)

const onAdd = () => {}
</script>
