import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export class TextEditor extends Component {

  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link'],
    ],
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  render() {
    const { handleQuillChange, content } = this.props
    return (
      <ReactQuill theme='snow'
        modules={this.modules}
        formats={this.formats}
        placeholder='Write content..'
        value={content}
        onChange={handleQuillChange}
        required >
      </ReactQuill>
    )
  }
}

export default TextEditor
