<template>
  <div class="c-dropdown cursor-pointer flex items-center">
    <slot />
    <ul class="dropdown text-xs font-normal" :class="dropdownClass">
      <li class="dropdown-item px-24 text-gray-500" v-for="(item, index) in list" :key="index"
        @click="onClickItem(item)">
        <NuxtLink :to="item.link" v-if="item.link" class="flex! items-center gap-12"
          :target="item.link.includes('http') ? '_blank' : '_self'">
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
  link?: string
  label: string
  antIcon?: string
  action?: () => void
  [key: string]: unknown
}
withDefaults(defineProps<{
  list: ListItem[]
  dropdownClass: string
}>(), {
  list: () => []
})

const onClickItem = (item: ListItem) => {
  if (item.link) return
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
    border-radius: 4px;
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