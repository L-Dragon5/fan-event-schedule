import axios from 'axios'
import M from 'materialize-css'
import $ from 'jquery'
import React, { Component } from 'react'

class RulesPage extends Component {
  componentDidMount () {
    // Get all Rules
    axios.get('/api/rules').then(response => {
      if (response.data != null) {
        this.setState({
          rules: response.data
        })
      }
    })

    window.addEventListener('DOMContentLoaded', this.handleInit)
    if (document.readyState !== 'loading') {
      this.handleInit()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('DOMContentLoaded', this.handleInit)
  }

  handleInit () {
    M.Collapsible.init($('.collapsible'))
  }

  render () {
    return (
      <div>
        <h2 className='page-title'>Rules & Policies</h2>
        <ul className='collapsible'>
          { this.state && this.state.rules &&
            Object.entries(this.state.rules).map((entry, index) => {
              const rule = entry[1]
              return (
                <li key={rule.id}>
                  <div className='collapsible-header'>{rule.title}</div>
                  <div className='collapsible-body'><span>{rule.description}</span></div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default RulesPage
