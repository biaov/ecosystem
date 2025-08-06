<template>
  <c-layout-list title="售后订单">
    <template #filter>
      <a-form-item>
        <a-input-group compact>
          <a-select v-model:value="formState.type" :options="saleOrderSearchEnum.options()" />
          <a-input v-model:value.trim="formState.keyword" placeholder="请输入关键词" />
        </a-input-group>
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.orderType" :options="saleOrderTypeEnum.options()" placeholder="订单类型" />
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.status" :options="saleOrderStatusEnum.options()" placeholder="订单状态" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="setPage">查询</a-button>
        <a-button @click="resetFormState">重置</a-button>
      </a-form-item>
    </template>
    <template #list>
      <a-table :data-source="data.items" row-key="id" :loading="loading" :pagination="$formatter.pagination(data)" :scroll="{ x: 1100 }" @change="setPage">
        <a-table-column title="订单编号/服务单号" :width="200">
          <template #="{ record }">
            {{ record.order.sn }}
            <br />
            {{ record.sn }}
          </template>
        </a-table-column>
        <a-table-column title="商品信息" :width="300">
          <template #="{ record }">
            <div v-for="(item, index) in record.order.items" :key="index" class="text-ellipsis">{{ item.sku }} | x{{ item.quantity }} | {{ item.goodsName }}</div>
          </template>
        </a-table-column>
        <a-table-column title="退款金额" :width="120">
          <template #="{ record }">
            <span class="text-danger">{{ record.refundAmount.toLocaleString() }}</span>
          </template>
        </a-table-column>
        <a-table-column title="申请用户" :width="120">
          <template #="{ record }">
            {{ record.user.nickname }}
            <br />
            {{ record.user.mobile }}
          </template>
        </a-table-column>
        <a-table-column title="订单类型" :width="120">
          <template #="{ record }">
            {{ saleOrderTypeEnum.filter(record.type)?.label }}
          </template>
        </a-table-column>
        <a-table-column title="订单状态" :width="120">
          <template #="{ record }">
            <a-badge :color="saleOrderStatusEnum.filter(record.status)?.color" :text="saleOrderStatusEnum.filter(record.status)?.label" :status="saleOrderStatusEnum.filterStatus(record.status)" />
          </template>
        </a-table-column>
        <a-table-column title="操作" :width="120" fixed="right">
          <template #="{ record }">
            <a-button type="link" size="small" :href="`/order/sale-detail/${record.id}`" v-perm="permKey.list">详情</a-button>
            <a-button type="link" size="small" @click="onExamine(record)" v-perm="permKey.update" v-if="record.status === saleOrderStatusEnum.normal">审核</a-button>
            <a-button type="link" size="small" @click="handleReceive(record)" v-perm="permKey.receive" v-if="record.status === saleOrderStatusEnum.receiving">签收</a-button>
            <a-button type="link" size="small" @click="onExamine(record)" v-perm="permKey.refund" v-if="record.status === saleOrderStatusEnum.refunding">退款</a-button>
          </template>
        </a-table-column>
      </a-table>
    </template>
  </c-layout-list>
  <modal-examine v-model:visible="visible" :form="editForm" @ok="setPage" />
</template>
<script lang="ts" setup>
import { saleOrderApi, saleOrderReceiveApi } from '@/api/order'
import ModalExamine from './components/modal-examine.vue'
import { saleOrderSearchEnum, saleOrderStatusEnum, saleOrderTypeEnum } from './enums'

const permKey = definePermission(PermissionKeyEnum.orderSale, { receive: 'receive', refund: 'refund' } as const)
const { formState, onRestFormState, resetFormState } = useFormState({
  type: saleOrderSearchEnum.orderSn,
  keyword: '',
  orderType: undefined,
  status: undefined,
  source: undefined
})

interface TableType extends IdDataType {
  sn: string
  status: string
  order: {
    sn: string
  }
}

const { data, setPage, loading } = usePagingApiRequest(({ current, pageSize }) =>
  saleOrderApi.paging({
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
const onExamine = (item: TableType) => {
  editForm.value = item
  setVisible(true)
}

const handleReceive = async (item: TableType) => {
  await saleOrderReceiveApi(item.id).post()
  message.success('操作成功')
  setPage()
}
</script>
