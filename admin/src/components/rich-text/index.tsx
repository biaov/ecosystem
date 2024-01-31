import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import type { Props } from './types'

export default function richTextComponent(props: Partial<Props> = {}) {
  const { value = '', onChange } = props
  const [richTextValue, setRichTextValue] = useState('')
  useEffect(() => {
    setRichTextValue(value)
  }, [value])

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],

      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],

      ['clean']
    ]
  }

  const onChangeRichText = (val: string) => {
    setRichTextValue(val)
    onChange && onChange(val)
  }
  return <ReactQuill placeholder="请输入内容" theme="snow" value={richTextValue} modules={modules} style={{ height: '300px', marginBottom: '43px' }} onChange={onChangeRichText} />
}
