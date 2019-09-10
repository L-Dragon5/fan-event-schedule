import axios from 'axios'
import React, { Component } from 'react'
import ExternalLink from './ExternalLink'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

class SingleGuest extends Component {
  constructor (props) {
    super(props)

    this.id = props.match.params.guestId
  }

  componentDidMount () {
    axios.get('/api/guest/' + this.id).then(response => {
      if (response.data != null) {
        this.setState({
          guest: response.data
        })
      }
    })
  }

  render () {
    if (this.state && this.state.guest) {
      return (
        <div>
          <h2 className='guest__name center-align'>{this.state.guest.name}</h2>
          <div className='guest__category center-align'><strong>Category:</strong> {this.state.guest.category}</div>
          <div className='guest__social-media center-align'>
            { this.state && this.state.guest.social_fb &&
              <ExternalLink href={this.state.social_fb} icon>
                <FontAwesomeIcon icon={['fab', 'facebook-square']} />
              </ExternalLink>
            }
            { this.state && this.state.guest.social_tw &&
              <ExternalLink href={this.state.social_tw} icon>
                <FontAwesomeIcon icon={['fab', 'twitter-square']} />
              </ExternalLink>
            }
            { this.state && this.state.guest.social_ig &&
              <ExternalLink href={this.state.social_ig} icon>
                <FontAwesomeIcon icon={['fab', 'instagram']} />
              </ExternalLink>
            }
          </div>
          <div className='divider' />
          <p className='guest__description responsive-text'>{this.state.guest.description}</p>
        </div>
      )
    } else {
      return (<div />)
    }
  }
}

export default SingleGuest
