<template>
  <c-layout-list title="积分订单">
    <template #filter>
      <a-form-item>
        <a-input-group compact>
          <a-select v-model:value="formState.type" :options="orderSearchEnum.options()" />
          <a-input v-model:value.trim="formState.keyword" placeholder="请输入关键词" />
        </a-input-group>
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.orderType" :options="orderTypeEnum.options()" placeholder="订单类型" />
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.status" :options="orderStatusEnum.options()" placeholder="订单状态" />
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.source" :options="sourceEnum.options()" placeholder="订单来源" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="setPage">查询</a-button>
        <a-button @click="resetFormState">重置</a-button>
      </a-form-item>
    </template>
    <template #list>
      <a-table :data-source="data.items" row-key="id" :loading="loading" :pagination="$formatter.pagination(data)" :scroll="{ x: 1100 }" @change="setPage">
        <a-table-column title="订单编号/下单时间" :width="200">
          <template #="{ record }">
            {{ record.sn }}
            <br />
            {{ record.createdAt }}
          </template>
        </a-table-column>
        <a-table-column title="礼品信息" :width="300">
          <template #="{ record }">
            <div v-for="(item, index) in record.items" :key="index" class="text-ellipsis">{{ item.sku }} | x{{ item.quantity }} | {{ item.giftName }}</div>
          </template>
        </a-table-column>
        <a-table-column title="兑换积分" :custom-render="$formatter.customRender('credit')" :width="120" />
        <a-table-column title="订单类型" :width="120">
          <template #="{ record }">
            {{ orderTypeEnum.filter(record.type)?.label }}
          </template>
        </a-table-column>
        <a-table-column title="订单来源" :width="120">
          <template #="{ record }">
            {{ sourceEnum.filter(record.source)?.label }}
          </template>
        </a-table-column>
        <a-table-column title="下单用户" :width="180">
          <template #="{ record }">
            {{ record.user.nickname }}
            <br />
            {{ record.user.mobile }}
          </template>
        </a-table-column>
        <a-table-column title="订单状态" :width="120">
          <template #="{ record }">
            <a-badge :color="orderStatusEnum.filter(record.status)?.color" :text="orderStatusEnum.filter(record.status)?.label" :status="orderStatusEnum.filterStatus(record.status)" />
          </template>
        </a-table-column>
        <a-table-column title="操作" :width="120" fixed="right">
          <template #="{ record }">
            <a-button type="link" size="small" :href="`/order/credit-detail/${record.id}`" v-perm="permKey.list">详情</a-button>
            <a-button type="link" size="small" @click="onSend(record)" v-perm="permKey.update" v-if="record.status === orderStatusEnum.paid">发货</a-button>
          </template>
        </a-table-column>
      </a-table>
    </template>
  </c-layout-list>
  <modal-send v-model:visible="visible" :form="editForm" type="credit" @ok="setPage" />
</template>
<script lang="ts" setup>
import { creditOrderApi } from '@/api/order'
import { sourceEnum } from '@/enums'
import ModalSend from './components/modal-send.vue'
import { orderSearchEnum, orderStatusEnum, orderTypeEnum } from './enums'

const permKey = definePermission(PermissionKeyEnum.orderCredit)
const { formState, onRestFormState, resetFormState } = useFormState({
  type: orderSearchEnum.sn,
  keyword: '',
  orderType: undefined,
  status: undefined,
  source: undefined
})

interface TableType extends IdDataType {
  sn: string
}

const { data, setPage, loading } = usePagingApiRequest(({ current, pageSize }) =>
  creditOrderApi.paging({
    ...useTransformQuery(formState, {}, 'search'),
    type: formState.value.orderType,
    orderType: undefined,
    current,
    pageSize
  })
)

onRestFormState(setPage)

const [visible, setVisible] = useState()
const editForm = ref<TableType>()
const onSend = (item: TableType) => {
  editForm.value = item
  setVisible(true)
}
</script>
