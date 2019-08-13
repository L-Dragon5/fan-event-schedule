import React, { Component } from 'react'

class Schedule extends Component {
  constructor (props) {
    super(props)

    this.href = props.href
    this.className = props.className
  }

  render () {
    return (
      <a href={this.href} className={this.className} rel='noopener noreferrer' target='_blank'>{this.props.children}</a>
    )
  }
}

export default Schedule
