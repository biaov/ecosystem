import type { Directive } from 'vue'

const { state } = useStore()

export const perm: Directive = {
  created(el, { value }) {},
  mounted(el, { value }) {
    if (usePermission(value)) return
    el.setAttribute('disabled', true)
    if (el.nodeName !== 'A') return
    el.style.pointerEvents = 'none'
    el.parentNode.style.cursor = 'not-allowed'
  }
}
