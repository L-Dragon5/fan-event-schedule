import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery'
import M from 'materialize-css'

import RichTextEditor from '../RichTextEditor'

class RuleAddForm extends Component {
  constructor (props) {
    super(props)

    this.token = props.token

    this.state = {
      description: '<p></p>'
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.saveDescription = this.saveDescription.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    $('.modal-errors').html('').hide()
    $('#modal-loader').show()
    $('#modal-submit').hide()

    const formData = new FormData(e.target)
    formData.append('description', this.state.description)

    axios.post('/api/rule/create', formData, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.token,
        'content-type': 'multipart/form-data'
      }
    }).then((response) => {
      if (response.status === 200) {
        M.toast({ html: response.data.message })
        $('#modal-close').trigger('click')
        this.props.unmount()
      }
    }).catch((error) => {
      if (error.response) {
        $('.modal-errors').html(error.response.data.message).show()
      }
    }).then(() => {
      $('#modal-loader').hide()
      $('#modal-submit').show()
    })
  }

  saveDescription (data) {
    const obj = JSON.parse(data)
    if (obj.content) {
      this.setState({
        description: obj.content
      })
    }
  }

  render () {
    return (
      <div className='row'>
        <form className='col s12' onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className='modal-errors col s12' />

            <div className='input-field col s12'>
              <input id='title' type='text' name='title' className='validate' required />
              <label htmlFor='title'>Title</label>
            </div>
            <div className='input-field col s12'>
              <RichTextEditor saveData={this.saveDescription} content={this.state.description} />
            </div>

            <div className='right-align'>
              <button id='modal-submit' type='submit' className='waves-effect waves-green btn'>Add</button>
              <div id='modal-loader' style={{ display: 'none' }} className='preloader-wrapper small active'><div className='spinner-layer spinner-green-only'><div className='circle-clipper left'><div className='circle'></div></div><div className='gap-patch'><div className='circle'></div></div><div className='circle-clipper right'><div className='circle'></div></div></div></div>
              <button id='modal-close' type='button' className='modal-close' style={{ display: 'none' }} />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default RuleAddForm
