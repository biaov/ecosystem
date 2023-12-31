/**
 * 图片预览
 */
export const useImgPreview = () => {
  /**
   * 颜色
   */
  const colors = [
    '#2d8cf0',
    '#19be6b',
    '#f90',
    '#f66',
    '#ed3f14',
    '#e46cbb',
    '#9a66e4',
    '#f4516c',
    '#b6a2de',
    '#d87a80',
    '#2ec7c9',
    '#5ab1ef',
    '#2cb1b1',
    '#00c189',
    '#6096db',
    '#7288b9',
    '#6f86d6',
    '#f772d1',
    '#c872f2',
    '#e877ae',
    '#fca65e'
  ]

  /**
   * 图片地址
   */
  const urls = colors.map(color => {
    const bg = color.slice(1).toUpperCase()
    return `https://dummyimage.com/200x200/${bg}/fff&text=${bg}`
  })

  /**
   * 图片预览
   */
  const onPreview = () => {
    uni.previewImage({ urls })
  }

  return { onPreview }
}
