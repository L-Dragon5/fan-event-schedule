import React, { Component } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

class RichTextEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      editorState: ''
    }

    const content = (props.content !== undefined && props.content !== null) ? props.content : ''

    const contentBlock = htmlToDraft(content)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      this.state = {
        editorState
      }
    }

    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.imageCallback = this.imageCallback.bind(this)
    this.passData = this.passData.bind(this)
  }

  passData () {
    const data = {
      content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }
    this.props.saveData(JSON.stringify(data))
  }

  onEditorStateChange (editorState) {
    this.setState({
      editorState
    })

    this.passData()
  }

  imageCallback (file) {
    return new Promise(
      (resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve({ data: { link: reader.result } })
        reader.onerror = (error) => reject(error)
      }
    )
  }

  render () {
    const { editorState } = this.state

    return (
      <Editor
        editorState={editorState}
        wrapperClassName='rich-text-editor-wrapper'
        editorClassName='rich-text-editor'
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          image: { uploadCallback: this.imageCallback }
        }}
      />
    )
  }
}

export default RichTextEditor
