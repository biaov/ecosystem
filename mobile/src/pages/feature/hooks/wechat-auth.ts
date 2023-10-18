/**
 * 微信授权
 */
export const useWechatAuth = () => {
  /**
   * 按钮列表
   */
  const btns = ref([
    {
      name: '获取手机号',
      openType: 'getPhoneNumber',
      value: '',
      callback: (e: Record<string, any>) => {
        btns.value[0].value = e.detail.errMsg
      }
    },
    {
      name: '获取用户信息',
      openType: 'getUserInfo',
      value: '',
      callback: (e: Record<string, any>) => {
        btns.value[1].value = JSON.stringify(e.detail)
      }
    },
    {
      name: '获取用户头像',
      openType: 'chooseAvatar',
      value: '',
      callback: (e: Record<string, any>) => {
        btns.value[2].value = e.detail.avatarUrl
      }
    }
  ])

  return { btns }
}
