import type { Directive } from 'vue'

export const perm: Directive = {
  mounted(el, { value }: { value: string | string[] }) {
    if (usePermission(value)) return
    el.setAttribute('disabled', true)
    el.parentNode.title = '权限不足，无法操作'
    const classList = [...el.classList]
    if (classList.includes('ant-input-number')) {
      const input = el.querySelector('input')
      input.setAttribute('disabled', true)
      input.style.cursor = 'not-allowed'
      el.querySelector('.ant-input-number-handler-wrap').style.display = 'none'
      return
    }
    if (classList.includes('ant-switch')) {
      el.classList.add('ant-switch-disabled')
      return
    }
    if (el.nodeName !== 'A') return
    el.style.pointerEvents = 'none'
    el.parentNode.style.cursor = 'not-allowed'
  }
}
