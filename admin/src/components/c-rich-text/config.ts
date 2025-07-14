export const toolbar = [
  {
    title: '加粗',
    class: 'bold'
  },
  {
    title: '斜体',
    class: 'italic'
  },
  {
    title: '下划线',
    class: 'underline'
  },
  {
    title: '中划线',
    class: 'strike'
  },
  {
    title: '引用',
    class: 'blockquote'
  },
  [
    {
      title: '一级标题',
      value: 1,
      class: 'header'
    },
    {
      title: '二级标题',
      value: 2,
      class: 'header'
    }
  ],
  [
    {
      title: '有序列表',
      value: 'ordered',
      class: 'list'
    },
    {
      title: '无序列表',
      value: 'bullet',
      class: 'list'
    }
  ],
  [
    {
      title: '下标',
      value: 'sub',
      class: 'script'
    },
    {
      title: '上标',
      value: 'super',
      class: 'script'
    }
  ],
  [
    {
      title: '左缩进',
      value: '-1',
      class: 'indent'
    },
    {
      title: '右缩进',
      value: '+1',
      class: 'indent'
    }
  ],
  [
    {
      title: '排列方向',
      value: 'rtl',
      class: 'direction'
    }
  ],
  {
    title: '大小',
    class: 'size',
    selected: false,
    value: ['small', false, 'large', 'huge']
  },
  {
    title: '标题级别',
    class: 'header',
    selected: false,
    value: [1, 2, 3, 4, 5, 6, false]
  },
  {
    title: '颜色',
    class: 'color',
    value: []
  },
  {
    title: '背景',
    class: 'background',
    value: []
  },
  {
    title: '字体',
    class: 'font',
    value: []
  },
  {
    title: '水平对齐',
    class: 'align',
    value: []
  },
  {
    title: '超链接',
    class: 'link'
  },
  {
    title: '视频',
    class: 'video'
  },
  {
    title: '上传图片',
    class: 'image'
  },
  {
    title: '清理格式',
    class: 'clean'
  }
]
