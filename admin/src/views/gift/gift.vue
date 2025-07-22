<template>
  <c-layout-list title="全部礼品">
    <template #filter>
      <a-form-item>
        <a-input-group compact>
          <a-select v-model:value="formState.type" :options="giftSearchEnum.options()" />
          <a-input v-model:value.trim="formState.keyword" placeholder="请输入关键词" />
        </a-input-group>
      </a-form-item>
      <a-form-item>
        <select-category v-model="formState.categoryId" placeholder="礼品分类" />
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.onsale" :options="onsaleEnum.options()" placeholder="上架状态" />
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.tag" :options="giftTagEnum.options()" placeholder="礼品标签" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="setPage">查询</a-button>
        <a-button @click="resetFormState">重置</a-button>
      </a-form-item>
    </template>
    <template #extra>
      <a-space>
        <a-space :size="0">
          <a-button type="link" :href="giftTemplateDownloadApi" v-perm="permKey.download">
            <template #icon>
              <c-ant-icon name="DownloadOutlined" />
            </template>
            下载模板
          </a-button>
          <a-upload :action="giftImportApi" :show-upload-list="false" @change="$onExport($event, setPage)">
            <a-button type="link" v-perm="permKey.import">
              <template #icon>
                <c-ant-icon name="ImportOutlined" />
              </template>
              导入库存
            </a-button>
          </a-upload>
        </a-space>
        <a-button type="primary" href="/gift/add" v-perm="permKey.create">新增礼品</a-button>
      </a-space>
    </template>
    <template #list>
      <a-table :data-source="data.items" row-key="id" :loading="loading" :pagination="$formatter.pagination(data)" :scroll="{ x: 1600 }" @change="setPage">
        <a-table-column title="礼品信息" :min-width="400">
          <template #="{ record }">
            <a-space>
              <a-image :src="record.photos[0]" :width="70" :height="70" />
              <div>
                <div>{{ record.name }}</div>
                <div class="text-info">{{ record.category?.name }}</div>
                <a-space>
                  <span class="text-primary" v-if="record.recommend">推荐</span>
                  <span class="text-success" v-if="record.newest">新品</span>
                  <span class="text-special" v-if="record.preferential">特惠</span>
                </a-space>
              </div>
            </a-space>
          </template>
        </a-table-column>
        <a-table-column title="礼品SKU" data-index="sku" :min-width="200" />
        <a-table-column title="兑换积分" :width="120">
          <template #="{ record }">
            {{ record.credit.toLocaleString() }}
          </template>
        </a-table-column>
        <a-table-column title="销量" :width="120">
          <template #="{ record }">
            {{ record.saleNum.toLocaleString() }}
          </template>
        </a-table-column>
        <a-table-column title="可售" :width="120">
          <template #="{ record }">
            {{ (record.stock - record.hold).toLocaleString() }}
          </template>
        </a-table-column>
        <a-table-column title="占用" :width="120">
          <template #="{ record }">
            {{ record.hold.toLocaleString() }}
          </template>
        </a-table-column>
        <a-table-column title="更新时间" data-index="updatedAt" :width="180" />
        <a-table-column title="上架状态" :width="140" fixed="right">
          <template #="{ record }">
            <a-switch v-model:checked="record.onsale" @change="handleUpdate(record, 'onsale')" v-perm="permKey.update" />
          </template>
        </a-table-column>
        <a-table-column title="库存" :width="120" fixed="right">
          <template #="{ record }">
            <a-input-number v-model:value="record.stock" :min="0" :max="9999" :precision="0" placeholder="礼品库存" @blur="handleUpdate(record, 'stock')" v-perm="permKey.update" class="w-full" />
          </template>
        </a-table-column>
        <a-table-column title="操作" :width="180" fixed="right">
          <template #="{ record }">
            <a-space :size="0">
              <a-button type="link" size="small" :href="`/gift/detail/${record.id}`" v-perm="permKey.list">详情</a-button>
              <a-button type="link" size="small" :href="`/gift/edit/${record.id}`" v-perm="permKey.update">编辑</a-button>
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
import { giftApi, giftTemplateDownloadApi, giftImportApi } from '@/api/gift'
import { onsaleEnum } from '@/enums'
import SelectCategory from './components/select-category.vue'
import { giftSearchEnum, giftTagEnum } from './enums'

interface TableType extends IdDataType {
  onsale: boolean
}
const permKey = definePermission(PermissionKeyEnum.giftList, { download: 'downloadTemplate', import: 'importStock' } as const)
const { formState, onRestFormState, resetFormState } = useFormState({
  type: giftSearchEnum.name,
  keyword: '',
  categoryId: undefined,
  onsale: undefined,
  tag: undefined
})

const { data, setPage, loading } = usePagingApiRequest(({ current, pageSize }) =>
  giftApi.paging({
    ...useTransformQuery(
      formState,
      {
        tag(value, rawQuery) {
          value && (rawQuery[value] = true)
        }
      },
      'search'
    ),
    current,
    pageSize
  })
)

onRestFormState(setPage)

const handleUpdate = async (item: TableType, field) => {
  await giftApi.update(item.id, { [field]: item[field] })
  message.success('操作成功')
  setPage()
}

const handleDelete = async (item: TableType) => {
  await giftApi.delete(item.id)
  message.success('删除成功')
  setPage()
}
</script>
