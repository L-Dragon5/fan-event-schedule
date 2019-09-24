import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery'

class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  passToken (data) {
    this.props.onTokenUpdate(data)
  }

  handleSubmit (e) {
    e.preventDefault()
    $('.modal-errors').html('').hide()
    $('#modal-loader').show()
    $('#modal-submit').hide()

    const formData = new FormData(e.target)

    axios.post('/api/login', formData, {
      headers: {
        'content-type': 'multipart/form-data',
        Accept: 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        $('#modal-close').trigger('click')
        this.passToken(response.data.message)
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
            <div className='input-field col s12'>
              <input id='email' type='email' name='email' className='validate' required />
              <label htmlFor='email'>Email</label>
            </div>
            <div className='input-field col s12'>
              <input id='password' type='password' name='password' className='validate' required />
              <label htmlFor='password'>Password</label>
            </div>
            <div className='right-align'>
              <button id='modal-submit' type='submit' className='waves-effect waves-green btn'>Log in</button>
              <div id='modal-loader' style={{ display: 'none' }} className='preloader-wrapper small active'><div className='spinner-layer spinner-green-only'><div className='circle-clipper left'><div className='circle'></div></div><div className='gap-patch'><div className='circle'></div></div><div className='circle-clipper right'><div className='circle'></div></div></div></div>
              <button id='modal-close' type='button' className='modal-close' style={{ display: 'none' }} />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
