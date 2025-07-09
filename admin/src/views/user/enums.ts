/**
 * 用户搜索/黑名单搜索
 */
export const userSearchEnum = Object.freeze({
  nickname: 'nickname',
  mobile: 'mobile',
  options() {
    return [
      {
        label: '用户昵称',
        value: this.nickname
      },
      {
        label: '手机号码',
        value: this.mobile
      }
    ]
  }
})
