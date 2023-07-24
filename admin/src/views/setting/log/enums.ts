export const serachTypes = {
  /**
   * 操作用户
   */
  nickname: 'nickname',

  /**
   * 操作内容
   */
  content: 'content',

  options() {
    return [
      { label: '操作用户', value: this.nickname },
      { label: '操作内容', value: this.content }
    ]
  }
}
