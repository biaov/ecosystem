// 横向位置
const cxs = [18, 27, 36, 45, 54, 63, 72, 81]
const circleHTML = cxs.reduce((prev, item, i) => `${prev}<circle r="4" cy="66" cx="${item}" class="a a${i + 1}"></circle>`, '')
// 动画
const keyframes = Array.from({ length: 4 }).reduce((prev, _, i) => `${prev}@keyframes a${i + 1}{0%{cy:66;}50%{cy:${34 + i * 2};}100%{cy:66;}}`, '')
// 填充颜色
const fills = ['#409eff', '#67c23a', '#f56c6c', '#722ed1'].reduce((prev, item, i) => `${prev}.a${i + 1},.a${i + 5}{fill:${item};}`, '')
// 动画
const animations = Array.from({ length: 8 }).reduce((prev, _, i) => `${prev}.a${i + 1}{animation-name:a${i < 4 ? (i % 4) + 1 : 4 - (i % 4)};animation-delay:${0.12 * i}s;}`, '')
// 大小
const size = 200
// HTML 模板
export default () =>
  `<!DOCTYPE html><html lang="zh-cn"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" /><meta http-equiv="X-UA-Compatible" content="ie=edge" /><title>加载中...</title><style>*{margin:0;padding:0;box-sizing:border-box}.loading{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);display:block;overflow:hidden;}</style></head><body><svg viewBox="0 0 100 100" width="${size}" height="${size}" class="loading"><style>${keyframes}.a{animation-iteration-count: infinite;animation-duration: 0.8s !important;animation-timing-function: ease-in-out !important;}${animations}${fills}</style>${circleHTML}</svg></body></html>`
