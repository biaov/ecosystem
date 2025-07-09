/**
 * 操作日志搜索
 */
export const operationSearchEnum = Object.freeze({
  content: 'content',
  nickname: 'nickname',
  options() {
    return [
      {
        label: '操作人',
        value: this.nickname
      },
      {
        label: '操作内容',
        value: this.content
      }
    ]
  }
})
