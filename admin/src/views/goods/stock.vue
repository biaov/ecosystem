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
        <a-button type="primary" @click="setPage">查询</a-button>
        <a-button @click="resetFormState">重置</a-button>
      </a-form-item>
    </template>
    <template #extra>
      <a-space :size="0">
        <a-button type="link" :href="goodsStockTemplateDownloadApi" v-perm="permKey.download">
          <template #icon>
            <c-ant-icon name="DownloadOutlined" />
          </template>
          下载模板
        </a-button>
        <a-upload :action="goodsStockImportApi" :show-upload-list="false" @change="$onExport($event, setPage)">
          <a-button type="link" v-perm="permKey.import">
            <template #icon>
              <c-ant-icon name="ImportOutlined" />
            </template>
            导入库存
          </a-button>
        </a-upload>
      </a-space>
    </template>
    <template #list>
      <a-table :data-source="data.items" row-key="id" :loading="loading" :pagination="$formatter.pagination(data)" @change="setPage">
        <a-table-column title="商品名称" :data-index="['product', 'name']" :width="240" ellipsis />
        <a-table-column title="商品SKU" data-index="sku" />
        <a-table-column title="库存" :width="200">
          <template #="{ record }">
            <a-input-number v-model:value="record.stock" :min="0" :max="9999" :precision="0" placeholder="商品库存" @blur="handleUpdate(record)" v-perm="permKey.update" class="w-full" />
          </template>
        </a-table-column>
        <a-table-column title="可售" :width="200">
          <template #="{ record }">
            {{ (record.stock - record.hold).toLocaleString() }}
          </template>
        </a-table-column>
        <a-table-column title="占用" :width="200">
          <template #="{ record }">
            {{ record.hold.toLocaleString() }}
          </template>
        </a-table-column>
      </a-table>
    </template>
  </c-layout-list>
</template>
<script lang="ts" setup>
import { goodsStockApi, goodsStockTemplateDownloadApi, goodsStockImportApi } from '@/api/goods'
import { goodsSearchEnum } from './enums'

const checked = ref(false)
interface TableType extends IdDataType {
  stock: number
}
const permKey = definePermission(PermissionKeyEnum.goodsList, { download: 'downloadTemplate', import: 'importStock' } as const)
const { formState, onRestFormState, resetFormState } = useFormState({
  type: goodsSearchEnum.name,
  keyword: ''
})

const { data, setPage, loading } = usePagingApiRequest(({ current, pageSize }) =>
  goodsStockApi.paging({
    ...useTransformQuery(formState, {}, 'search'),
    current,
    pageSize
  })
)

onRestFormState(setPage)

const handleUpdate = async (item: TableType) => {
  await goodsStockApi.update(item.id, { stock: item.stock })
  message.success('操作成功')
}
</script>
