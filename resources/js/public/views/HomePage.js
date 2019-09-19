import React, { Component } from 'react'
import axios from 'axios'
import RichTextEditor from '../components/RichTextEditor'

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      content: '',
      editing: false
    }

    this.token = props.token
    this.editPage = this.editPage.bind(this)
    this.savePage = this.savePage.bind(this)
    this.saveData = this.saveData.bind(this)
  }

  componentDidMount () {
    // Get home page text
    axios.get('/api/home').then(response => {
      if (response.data != null) {
        this.setState({
          content: response.data
        })
      }
    })
  }

  editPage () {
    this.setState({
      editing: true
    })
  }

  savePage () {
    const formData = new FormData()
    formData.append('content', this.state.content)

    axios.post('/api/home/update', formData, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.token,
        'content-type': 'multipart/form-data'
      }
    })
      .then((response) => {
        if (response.data != null) {
          this.setState({
            editing: false
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  saveData (data) {
    const obj = JSON.parse(data)
    if (obj.content) {
      this.setState({
        content: obj.content
      })
    }
  }

  render () {
    if (this.state && this.state.editing) {
      return (
        <div>
          <RichTextEditor contentId='content' content={this.state.content} saveData={this.saveData} />
          { this.token &&
            <div>
              <div id='home-save-button' className='fixed-action-btn' onClick={this.savePage}>
                <a className='btn-floating btn-large red'>
                  <i className='large material-icons'>save</i>
                </a>
              </div>
            </div>
          }
        </div>
      )
    } else {
      return (
        <div>
          <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
          { this.token &&
            <div>
              <div id='home-edit-button' className='fixed-action-btn' onClick={this.editPage}>
                <a className='btn-floating btn-large red'>
                  <i className='large material-icons'>mode_edit</i>
                </a>
              </div>
            </div>
          }
        </div>
      )
    }
  }
}

export default HomePage
