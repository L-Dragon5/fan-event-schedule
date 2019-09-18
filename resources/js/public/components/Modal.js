import React, { Component } from 'react'

class Modal extends Component {
  constructor (props) {
    super(props)

    this.id = props.id
    this.button = props.button
  }

  render () {
    return (
      <div
        id={this.id}
        className='modal'>
        <div className='modal-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Modal
