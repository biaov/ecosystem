<template>
  <div class="c-dropdown cursor-pointer flex items-center">
    <slot />
    <ul class="dropdown text-xs font-normal" :class="dropdownClass">
      <li class="dropdown-item px-24 text-gray-500" v-for="(item, index) in list" :key="index" @click="onClickItem(item)">
        <NuxtLink :to="item.path" v-if="item.path" class="flex! items-center gap-12" :target="item.path.includes('http') ? '_blank' : '_self'">
          <c-ant-icon :name="item.antIcon" v-if="item.antIcon" />
          <span>{{ item.label }}</span>
        </NuxtLink>
        <div class="flex items-center gap-12" v-else>
          <c-ant-icon :name="item.antIcon" v-if="item.antIcon" />
          <span>{{ item.label }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
interface ListItem {
  path?: string
  label: string
  antIcon?: string
  action?: () => void
  [key: string]: unknown
}
withDefaults(
  defineProps<{
    list: ListItem[]
    dropdownClass: string
  }>(),
  {
    list: () => []
  }
)

const onClickItem = (item: ListItem) => {
  if (item.path) return
  item.action?.()
}
</script>

<style scoped lang="less">
.c-dropdown {
  position: relative;

  .dropdown {
    position: absolute;
    background: #fff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s;

    &-item {
      display: flex;
      align-items: center;
      height: 40px;

      &:hover {
        background: rgba(@color-primary, 20%);
        color: @color-primary;
      }
    }
  }

  &:hover {
    .dropdown {
      max-height: 300%;
    }
  }
}
</style>
