<template>
  <c-layout-list title="拉黑名单">
    <template #filter>
      <a-form-item>
        <a-input-group compact>
          <a-select v-model:value="formState.type" :options="userSearchEnum.options()" />
          <a-input v-model:value.trim="formState.keyword" placeholder="请输入关键词" />
        </a-input-group>
      </a-form-item>
      <a-form-item>
        <reason-select v-model="formState.reason" placeholder="拉黑原因" class="w-200!" />
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
        <a-table-column title="拉黑原因" data-index="reason" />
        <a-table-column title="操作" :width="120">
          <template #="{ record }">
            <a-popconfirm placement="left" title="你确定要移出这个用户吗?" @confirm="handleDelete(record)">
              <a-button type="link" size="small" danger v-perm="permKey.delete">移出</a-button>
            </a-popconfirm>
          </template>
        </a-table-column>
      </a-table>
    </template>
  </c-layout-list>
</template>
<script lang="ts" setup>
import { userBlocklistApi } from '@/api/user'
import ReasonSelect from './components/reason-select.vue'
import { userSearchEnum } from './enums'

const permKey = definePermission(PermissionKeyEnum.userBlocklist)
const { formState, onRestFormState, resetFormState } = useFormState({
  type: userSearchEnum.nickname,
  keyword: '',
  reason: undefined
})

const { data, setPage, loading } = usePagingApiRequest(({ current, pageSize }) =>
  userBlocklistApi.paging({
    ...useTransformQuery(formState, {}, 'search'),
    current,
    pageSize
  })
)

onRestFormState(setPage)

const handleDelete = async (item: IdDataType) => {
  await userBlocklistApi.delete(item.id)
  message.success('移出成功')
  setPage()
}
</script>
