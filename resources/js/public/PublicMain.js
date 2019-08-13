import axios from 'axios'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Route, NavLink, HashRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'

// Custom
import HomePage from './views/HomePage'
import SchedulePage from './views/SchedulePage'
import ExternalLink from './components/ExternalLink'

library.add(fab)

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/schedule',
    component: SchedulePage
  }
]

class PublicMain extends Component {
  componentDidMount () {
    // Get Registration Link
    axios.get('/api/setting/registration_link').then(response => {
      if (response.data != null) {
        this.setState({
          registrationLink: response.data
        })
      }
    })

    // Get Social Media Links
    axios.get('/api/settings/social').then(response => {
      if (response.data != null) {
        this.setState({
          socialFB: response.data.social_fb,
          socialTW: response.data.social_tw,
          socialIG: response.data.social_ig
        })
      }
    })
  }

  render () {
    const routeComponents = routes.map(({ path, component }, key) => <Route exact path={path} component={component} key={key} />)

    return (
      <HashRouter>
        <ul id='sidebar' className='sidenav sidenav-fixed'>
          <li>
            <div className='user-view'>
              <span className='name'>{process.env.MIX_EVENT_NAME}</span>
              <div style={{ fontSize: '2rem' }}>
                { this.state && this.state.socialFB &&
                  <ExternalLink href={this.state.socialFB}>
                    <FontAwesomeIcon icon={['fab', 'facebook-square']} />
                  </ExternalLink>
                }
                { this.state && this.state.socialTW &&
                  <ExternalLink href={this.state.socialTW}>
                    <FontAwesomeIcon icon={['fab', 'twitter-square']} />
                  </ExternalLink>
                }
                { this.state && this.state.socialIG &&
                  <ExternalLink href={this.state.socialIG}>
                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                  </ExternalLink>
                }
              </div>
            </div>
          </li>
          <li><div className='divider' /></li>
          { this.state && this.state.registrationLink &&
            <li>
              <ExternalLink href={this.state.registrationLink} className='waves-effect'>
                <i className='material-icons'>add_shopping_cart</i>Register Now!
                <i className='material-icons right'>launch</i>
              </ExternalLink>
            </li>
          }
          <li>
            <NavLink exact to='/' className='waves-effect'>
              <i className='material-icons'>home</i>General Information
            </NavLink>
          </li>
          <li>
            <NavLink to='/schedule' className='waves-effect'>
              <i className='material-icons'>web</i>Schedule
            </NavLink>
          </li>
        </ul>

        <header className='valign-wrapper'>
          <a href='#' data-target='sidebar' className='sidenav-trigger'>
            <i className='material-icons'>menu</i>
          </a>
          <span>{process.env.MIX_EVENT_NAME}</span>
        </header>

        <main>
          { routeComponents }
        </main>
      </HashRouter>
    )
  }
}

export default PublicMain

if (document.getElementById('public-root')) {
  ReactDOM.render(<PublicMain />, document.getElementById('public-root'))

  document.addEventListener('DOMContentLoaded', () => {
    const elem = document.querySelector('.sidenav')
    M.Sidenav.init(elem)
  })
}
