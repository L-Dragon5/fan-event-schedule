import axios from 'axios'
import React, { Component } from 'react'
import ExternalLink from '../components/ExternalLink'

class ExhibitorsPage extends Component {
  componentDidMount () {
    axios.get('/api/exhibitors').then(response => {
      if (response.data != null) {
        this.setState({
          exhibitors: response.data
        })
      }
    })
  }

  render () {
    const exhibitors = this.state.exhibitors

    return (
      <div>
        <h2 className='page-title'>Exhibitors</h2>
        { exhibitors &&
          Object.entries(exhibitors).map((k, index) => {
            const category = k[0]
            const list = k[1]

            return (
              <ul key={index} className='collection with-header' style={{ marginBottom: '5rem' }}>
                <li key={category} className='collection-header'><h5>{category}</h5></li>
                {
                  Object.entries(list).map((k, index) => {
                    const exhibitor = k[1]

                    if (exhibitor.url != null) {
                      return (
                        <li key={exhibitor.id} className='collection-item'>
                          <ExternalLink href={exhibitor.url}>{exhibitor.name}</ExternalLink>
                        </li>
                      )
                    } else {
                      return (
                        <li key={exhibitor.id} className='collection-item'>
                          <span>{exhibitor.name}</span>
                        </li>
                      )
                    }
                  })
                }
              </ul>
            )
          })
        }
      </div>
    )
  }
}

export default ExhibitorsPage
