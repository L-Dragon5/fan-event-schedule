import axios from 'axios'
import React, { Component } from 'react'
import ExternalLink from '../components/ExternalLink'

class SellersPage extends Component {
  componentDidMount () {
    // Get all sellers
    axios.get('/api/sellers').then(response => {
      if (response.data != null) {
        this.setState({
          sellers: response.data
        })
      }
    })
  }

  render () {
    return (
      <div>
        <h2 className='page-title'>Exhibitors</h2>
        { this.state && this.state.sellers &&
          Object.entries(this.state.sellers).map((k, index) => {
            const category = k[0]
            const list = k[1]

            return (
              <ul key={index} className='collection with-header' style={{ marginBottom: '5rem' }}>
                <li key={category} className='collection-header'><h5>{category}</h5></li>
                {
                  Object.entries(list).map((k, index) => {
                    const seller = k[1]

                    if (seller.url != null) {
                      return (
                        <li key={seller.id} className='collection-item'>
                          <ExternalLink href={seller.url}>{seller.name}</ExternalLink>
                        </li>
                      )
                    } else {
                      return (
                        <li key={seller.id} className='collection-item'>
                          <span>{seller.name}</span>
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

export default SellersPage
