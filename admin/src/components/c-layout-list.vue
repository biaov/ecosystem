<template>
  <!-- 列表页基础组件 -->
  <div class="layout-list">
    <a-space direction="vertical" :size="20" :class="{ 'fixed-filter': fixedFilter }">
      <a-card v-if="$slots.filter" class="std-filter">
        <a-form layout="inline">
          <slot name="filter"></slot>
        </a-form>
      </a-card>
      <a-card v-if="!noBody" :title="title">
        <template #extra>
          <slot name="extra"></slot>
        </template>
        <template #title>
          <slot name="title"></slot>
        </template>
        <slot name="list"></slot>
      </a-card>
      <slot name="default"></slot>
    </a-space>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  // 标题
  title: {
    type: String,
    default: ''
  },
  /**
   * 无主体
   */
  noBody: {
    type: Boolean,
    default: false
  },
  /**
   * 固定查询
   */
  fixedFilter: {
    type: Boolean,
    default: false
  }
})
</script>
<style scoped lang="less">
.layout-list {
  @margin-filter: 10px;

  > :deep(.ant-space) {
    width: 100%;
  }

  :deep(.ant-form-inline .ant-form-item) {
    margin-bottom: @margin-filter;
  }

  .std-filter {
    :deep(.ant-card-body) {
      padding-bottom: 8px;

      .ant-form-inline {
        .ant-form-item {
          margin-bottom: 16px;

          .ant-input {
            width: 300px;
          }

          .ant-input-group-wrapper {
            width: 420px;

            .ant-input-group-addon {
              .ant-select {
                width: 120px;
              }
            }

            .ant-input {
              width: 100%;
            }
          }

          .ant-select {
            width: 120px;
          }

          .ant-calendar-picker,
          .ant-cascader-picker {
            width: 250px;

            .ant-input {
              width: 100%;

              .ant-calendar-range-picker-input {
                display: inline-block;
              }
            }
          }
        }
      }

      // 按钮
      .ant-form-item:last-child .ant-form-item-control-input-content .ant-btn {
        margin-right: @margin-filter;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .fixed-filter {
    :deep(> .ant-space-item) {
      position: relative;
      z-index: 1;

      &:first-child {
        position: sticky;
        top: 0;
        left: 0;
        z-index: 2;
      }
    }
  }
}
</style>
