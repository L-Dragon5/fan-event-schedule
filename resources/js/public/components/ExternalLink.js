import React, { Component } from 'react'

class ExternalLink extends Component {
  constructor (props) {
    super(props)

    this.href = props.href
    this.className = props.className
    this.style = {
      color: 'rgba(0,0,0,0.87)',
      marginRight: '0.5rem'
    }

    if (props.icon) {
      this.style.fontSize = '1.75rem'
      this.style.color = 'rgba(0,0,0,0.65)'
    }
  }

  render () {
    return (
      <a
        href={this.href}
        className={this.className}
        style={this.style}
        rel='noopener noreferrer'
        target='_blank'>
        {this.props.children}
      </a>
    )
  }
}

export default ExternalLink
