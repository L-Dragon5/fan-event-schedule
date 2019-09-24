import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery'
import M from 'materialize-css'

class ExhibitorEditForm extends Component {
  constructor (props) {
    super(props)

    this.exhibitor = props.exhibitor
    this.token = props.token

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    $('.modal-errors').html('').hide()
    $('#modal-loader').show()
    $('#modal-submit').hide()

    const formData = new FormData(e.target)

    axios.post('/api/exhibitor/update/' + this.exhibitor.id, formData, {
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

  render () {
    return (
      <div className='row'>
        <form className='col s12' onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className='modal-errors col s12' />

            <div className='input-field col s12 m6'>
              <input id='name' type='text' name='name' className='validate' defaultValue={this.exhibitor.name} required />
              <label htmlFor='name'>Name</label>
            </div>
            <div className='input-field col s12 m6'>
              <input id='category' type='text' name='category' className='validate' defaultValue={this.exhibitor.category} />
              <label htmlFor='category'>Category</label>
            </div>
            <div className='input-field col s12'>
              <input id='url' type='url' name='url' className='validate' defaultValue={this.exhibitor.url} />
              <label htmlFor='url'>URL</label>
            </div>

            <div className='right-align'>
              <button id='modal-submit' type='submit' className='waves-effect waves-green btn'>Update</button>
              <div id='modal-loader' style={{ display: 'none' }} className='preloader-wrapper small active'><div className='spinner-layer spinner-green-only'><div className='circle-clipper left'><div className='circle'></div></div><div className='gap-patch'><div className='circle'></div></div><div className='circle-clipper right'><div className='circle'></div></div></div></div>
              <button id='modal-close' type='button' className='modal-close' style={{ display: 'none' }} />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default ExhibitorEditForm
