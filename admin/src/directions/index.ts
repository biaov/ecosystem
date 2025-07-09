import type { Directive } from 'vue'

export const perm: Directive = {
  mounted(el, { value }) {
    if (usePermission(value)) return
    el.setAttribute('disabled', true)
    el.parentNode.title = '权限不足，无法操作'
    if (el.nodeName !== 'A') return
    el.style.pointerEvents = 'none'
    el.parentNode.style.cursor = 'not-allowed'
  }
}
