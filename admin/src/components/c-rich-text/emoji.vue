<template>
  <a-dropdown v-model:open="visible" :trigger="['click']">
    <svg viewBox="0 0 1024 1024" width="28" height="24" class="fill-[#444] hover:fill-[#06c] py-3 px-5 cursor-pointer outline-none" @click.prevent @mousedown="onShowEmoji">
      <path
        d="M510.944 64c-247.04 0-448 200.96-448 448s200.96 448 448 448 448-200.96 448-448S757.984 64 510.944 64zM256 419.328c0-8.832 7.168-16 16-16 36.352 0 62.72-26.912 62.72-64 0-8.832 7.168-16 16-16s16 7.168 16 16c0 36.32 33.728 60.256 66.336 62.4C441.472 402.272 448 409.28 448 417.696s-6.528 15.84-14.944 16.416c-31.2 2.048-60.352 29.312-65.632 59.904 0.128 1.408 0.256 2.816 0.352 4.224 0.576 8.832-6.112 16.448-14.944 16.992-0.224 0-0.416 0-0.64 0.032-0.48 0.032-0.96 0.064-1.472 0.064-0.32 0-0.672 0-0.992-0.032-8.832-0.544-15.52-8.128-14.976-16.96 0.096-1.504 0.224-3.04 0.384-4.544-5.024-33.28-31.712-58.496-63.136-58.496C263.168 435.328 256 428.16 256 419.328zM740.416 660.768c-55.008 71.52-138.24 112.576-228.416 112.576-89.184 0-171.904-40.32-226.88-110.624-10.88-13.92-8.448-34.016 5.472-44.928 13.92-10.848 34.016-8.448 44.928 5.504 42.784 54.688 107.104 86.048 176.48 86.048 70.112 0 134.88-31.904 177.664-87.552 10.784-14.016 30.848-16.672 44.864-5.888C748.544 626.688 751.2 646.784 740.416 660.768zM753.888 434.08c-31.2 2.048-60.384 29.312-65.632 59.904 0.128 1.408 0.256 2.816 0.352 4.224 0.576 8.832-6.112 16.448-14.944 16.992-0.224 0-0.448 0-0.64 0.032-0.512 0.032-0.992 0.064-1.504 0.064-0.32 0-0.672 0-0.992-0.032-8.8-0.544-15.488-8.128-14.976-16.96 0.096-1.504 0.224-3.04 0.416-4.544-5.056-33.28-31.712-58.496-63.168-58.496-8.832 0-16-7.168-16-16s7.168-16 16-16c36.352 0 62.72-26.912 62.72-64 0-8.832 7.168-16 16-16s16 7.168 16 16c0 36.32 33.728 60.256 66.336 62.4 8.416 0.576 14.944 7.552 14.944 15.968S762.272 433.536 753.888 434.08z"
      ></path>
    </svg>
    <template #overlay>
      <a-card :body-style="{ padding: '0 12px 12px 12px', width: '350px' }">
        <a-tabs size="small">
          <a-tab-pane key="1" tab="表情">
            <a-space wrap :size="0">
              <a-button type="text" size="small" class="w-40! h-40! flex justify-center items-center" v-for="(item, index) in commonEmoji" :key="index" @click="onEmoji(item)">
                {{ item }}
              </a-button>
            </a-space>
          </a-tab-pane>
          <a-tab-pane key="2" tab="手势" force-render>
            <a-space wrap :size="0">
              <a-button type="text" size="small" class="w-40! h-40! flex justify-center items-center" v-for="(item, index) in gestureEmoji" :key="index" @click="onEmoji(item)">
                {{ item }}
              </a-button>
            </a-space>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import Quill from 'quill'
import { commonEmoji, gestureEmoji } from './emoji'

const props = defineProps<{
  quill: () => Quill
}>()

const range = ref({ index: 0, length: 0 })
const [visible, setVisible] = useState()
const onShowEmoji = () => {
  props.quill().getSelection
  const selection = props.quill().getSelection()
  if (selection) {
    range.value = selection
  } else {
    const index = props.quill().getLength() - 1
    range.value = { index, length: 0 }
  }
}
const onEmoji = (value: string) => {
  props.quill().insertText(range.value.index, value, Quill.sources.USER)
  setVisible(false)
}
</script>
