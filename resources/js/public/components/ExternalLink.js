import React, { Component } from 'react'

class ExternalLink extends Component {
  constructor (props) {
    super(props)

    this.href = props.href
    this.className = props.className
    this.style = props.style
  }

  render () {
    return (
      <a
        href={this.href}
        className={'external-link ' + this.className}
        style={this.style}
        rel='noopener noreferrer'
        target='_blank'>
        {this.props.children}
      </a>
    )
  }
}

export default ExternalLink
