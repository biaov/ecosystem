<template>
  <c-layout-list title="用户管理">
    <template #filter>
      <a-form-item>
        <a-input-group compact>
          <a-select v-model:value="formState.type" :options="userSearchEnum.options()" />
          <a-input v-model:value.trim="formState.keyword" placeholder="请输入关键词" />
        </a-input-group>
      </a-form-item>
      <a-form-item>
        <a-range-picker v-model:value="formState.createdAt" value-format="YYYY-MM-DD HH:mm:ss" :placeholder="['注册开始时间', '注册结束时间']" show-time />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="setPage">查询</a-button>
        <a-button @click="resetFormState">重置</a-button>
      </a-form-item>
    </template>
    <template #extra></template>
    <template #list>
      <a-table :data-source="data.items" row-key="id" :loading="loading" :pagination="$formatter.pagination(data)" @change="setPage">
        <a-table-column title="用户昵称" data-index="nickname" />
        <a-table-column title="手机号码" data-index="mobile" />
        <a-table-column title="注册时间" data-index="createdAt" />
        <a-table-column title="操作" :width="120">
          <template #="{ record }">
            <a-button type="link" size="small" danger @click="onBlocklist(record)" v-perm="permKey.block">拉黑</a-button>
          </template>
        </a-table-column>
      </a-table>
    </template>
  </c-layout-list>
  <modal-blocklist v-model:visible="blocklistVisible" :model-value="blocklistForm" @ok="setPage()" />
</template>
<script lang="ts" setup>
import { userApi } from '@/api/user'
import ModalBlocklist from './components/modal-blocklist.vue'
import { userSearchEnum } from './enums'

const permKey = definePermission(PermissionKeyEnum.userList, { block: 'block' } as const)
const { formState, onRestFormState, resetFormState } = useFormState({
  type: userSearchEnum.nickname,
  keyword: '',
  module: [],
  createdAt: []
})

interface TableType extends IdDataType {}

const { data, setPage, loading } = usePagingApiRequest(({ current, pageSize }) =>
  userApi.paging({
    ...useTransformQuery(formState, { createdAt: 'range' }, 'search'),
    current,
    pageSize
  })
)

onRestFormState(setPage)

const blocklistForm = ref<TableType | null>(null)
const [blocklistVisible, setBlocklistVisible] = useState()
const onBlocklist = (item: TableType) => {
  blocklistForm.value = item
  setBlocklistVisible(true)
}
</script>
