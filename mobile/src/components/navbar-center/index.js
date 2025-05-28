const { height, top } = uni.getMenuButtonBoundingClientRect()
const x = 10
const navbarHeight = height + top + x
const navbarTitleHeight = height + 2 * x

Component({
  data: {
    getStyle: `--navbar-height:${navbarHeight}px;--navbar-title-height:${navbarTitleHeight}px;`
  }
})
