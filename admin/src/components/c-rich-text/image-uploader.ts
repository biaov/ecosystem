import Quill from 'quill'
import type { QuillOptions, Delta, Range } from 'quill'
import Block from 'quill/blots/block'
import Toolbar from 'quill/modules/toolbar'

const InlineBlot = Quill.import('blots/block') as typeof Block

/**
 * 加载图片
 */
class LoadingImage extends InlineBlot {
  static create(src: string | boolean) {
    const node = super.create(src)
    if (src === true) return node

    const image = document.createElement('img')
    image.setAttribute('src', src as string)
    node.appendChild(image)
    return node
  }
  deleteAt(index: number, length: number) {
    super.deleteAt(index, length)
    this.cache = {}
  }
  static value(domNode: HTMLElement) {
    const { src, custom } = domNode.dataset
    return { src, custom }
  }
}

LoadingImage.blotName = 'imageBlot'
LoadingImage.className = 'image-uploading'
LoadingImage.tagName = 'span'
Quill.register({ 'formats/imageBlot': LoadingImage })

/**
 * 图片上传
 */
class ImageUploader {
  private quill: Quill
  private options: QuillOptions & { upload?: (file: File) => Promise<string> }
  private range: Range | null
  private placeholderDelta: Delta | null
  private fileHolder?: HTMLInputElement
  constructor(quill: Quill, options: QuillOptions) {
    this.quill = quill
    this.options = options
    this.range = null
    this.placeholderDelta = null

    if (typeof this.options.upload !== 'function') throw new Error('参数 upload 上传函数必传')

    const toolbar = this.quill.getModule('toolbar') as Toolbar
    toolbar && toolbar.addHandler('image', this.selectLocalImage.bind(this))

    this.handleDrop = this.handleDrop.bind(this)
    this.handlePaste = this.handlePaste.bind(this)

    this.quill.root.addEventListener('drop', this.handleDrop, false)
    this.quill.root.addEventListener('paste', this.handlePaste, false)
  }

  /**
   * 选择本地图片
   */
  selectLocalImage() {
    this.quill.focus()
    this.range = this.quill.getSelection()
    this.fileHolder = document.createElement('input')
    this.fileHolder.setAttribute('type', 'file')
    this.fileHolder.setAttribute('accept', 'image/*')
    this.fileHolder.setAttribute('style', 'visibility:hidden')

    this.fileHolder.onchange = this.fileChanged.bind(this)

    document.body.appendChild(this.fileHolder)

    this.fileHolder.click()

    window.requestAnimationFrame(() => {
      this.fileHolder && document.body.removeChild(this.fileHolder)
    })
  }

  /**
   * 拖拽图片进入编辑区
   */
  handleDrop(evt: DragEvent) {
    if (!(evt.dataTransfer && evt.dataTransfer.files && evt.dataTransfer.files.length)) return
    evt.stopPropagation()
    evt.preventDefault()
    const selection = document.getSelection()
    const range = document.caretPositionFromPoint(evt.clientX, evt.clientY)
    selection && range && selection.setBaseAndExtent(range.offsetNode, range.offset, range.offsetNode, range.offset)

    this.quill.focus()
    this.range = this.quill.getSelection()
    let file = evt.dataTransfer.files[0]

    setTimeout(() => {
      this.quill.focus()
      this.range = this.quill.getSelection()
      this.readAndUploadFile(file)
    }, 0)
  }

  /**
   * 粘贴操作
   */
  handlePaste(evt: ClipboardEvent) {
    const clipboard = evt.clipboardData
    if (!(clipboard && (clipboard.items || clipboard.files))) return
    const items = clipboard.items || clipboard.files
    const imgTypeRege = /^image\/(jpe?g|gif|png|svg|webp)$/i
    for (let i = 0; i < items.length; i++) {
      if (!imgTypeRege.test(items[i].type)) return
      let file = items[i].getAsFile()
      if (!file) return
      this.quill.focus()
      this.range = this.quill.getSelection()
      evt.preventDefault()
      setTimeout(() => {
        this.quill.focus()
        this.range = this.quill.getSelection()
        this.readAndUploadFile(file)
      }, 0)
    }
  }

  /**
   * 读取并上传文件
   */
  readAndUploadFile(file: File) {
    let isUploadReject = false
    const fileReader = new FileReader()
    fileReader.addEventListener(
      'load',
      () => {
        if (isUploadReject) return
        let base64ImageSrc = fileReader.result as string
        this.insertBase64Image(base64ImageSrc)
      },
      false
    )

    file && fileReader.readAsDataURL(file)
    this.options.upload!(file).then(
      imageUrl => {
        this.insertToEditor(imageUrl)
      },
      error => {
        isUploadReject = true
        this.removeBase64Image()
        console.warn(error)
      }
    )
  }

  /**
   * 文件更改
   */
  fileChanged() {
    if (!this.fileHolder) return
    const file = this.fileHolder.files![0]
    this.readAndUploadFile(file)
  }

  /**
   * 插入 base64 图片
   */
  insertBase64Image(url: string) {
    this.placeholderDelta = this.quill.insertEmbed(this.range!.index, LoadingImage.blotName, `${url}`, 'user')
  }

  /**
   * 插入图片
   */
  insertToEditor(url: string) {
    const range = this.range!
    const lengthToDelete = this.calculatePlaceholderInsertLength()
    this.quill.deleteText(range.index, lengthToDelete, 'user')
    this.quill.insertEmbed(range.index, 'image', `${url}`, 'user')
    range.index++
    this.quill.setSelection(range, 'user')
  }

  /**
   * 计算占位符长度
   */
  calculatePlaceholderInsertLength() {
    return this.placeholderDelta!.ops.reduce((accumulator, deltaOperation) => {
      if (deltaOperation.hasOwnProperty('insert')) accumulator++
      return accumulator
    }, 0)
  }

  /**
   * 移除本地 base64 图片
   */
  removeBase64Image() {
    const { index } = this.range!
    const lengthToDelete = this.calculatePlaceholderInsertLength()
    this.quill.deleteText(index, lengthToDelete, 'user')
  }
}
Quill.register('modules/imageUploader', ImageUploader)
