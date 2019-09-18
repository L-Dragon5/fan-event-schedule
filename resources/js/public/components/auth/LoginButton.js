import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery'
import M from 'minimatch'

class LoginButton extends Component {
  constructor (props) {
    super(props)

    this.modalId = props.modalId

    this.handleClick = this.handleClick.bind(this)
  }

  isEmpty (el) {
    return !$.trim(el.html())
  }

  handleClick (e) {
    e.preventDefault()
    const modal = $('#' + this.modalId)
    const modalErrors = $('#' + this.modalId + 'Errors')
    modalErrors.html('');

    const emailEle = modal.find('#email')
    const passwordEle = modal.find('#password')
    const email = emailEle.val()
    const password = passwordEle.val()

    let errors = '';

    if (this.isEmpty(emailEle) || !emailEle[0].checkValidity()) {
      errors += '<span>Please enter an email address</span><br>'
    }

    if (this.isEmpty(passwordEle) || !passwordEle[0].checkValidity()) {
      errors += '<span>Please enter a password</span>'
    }

    if (errors !== '') {
      modalErrors.html(errors)
    }
  }

  render () {
    return (
      <button
        className='waves-effect waves-green btn'
        onClick={this.handleClick}>Login</button>
    )
  }
}

export default LoginButton
