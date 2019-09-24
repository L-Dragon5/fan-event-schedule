import React, { Component } from 'react'

class Modal extends Component {
  constructor (props) {
    super(props)

    this.id = props.id
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
