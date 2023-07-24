export const serachTypes = {
  /**
   * 用户昵称
   */
  nickname: 'nickname',

  /**
   * 手机号码
   */
  phoneNumber: 'phoneNumber',

  options() {
    return [
      { label: '用户昵称', value: this.nickname },
      { label: '手机号码', value: this.phoneNumber }
    ]
  }
}
