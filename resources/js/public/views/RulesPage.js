import axios from 'axios'
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
  }

  render () {
    return (
      <div>
        <h2>Rules & Policies</h2>
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
