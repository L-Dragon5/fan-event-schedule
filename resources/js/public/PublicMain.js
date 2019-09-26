import axios from 'axios'
import React, { Component } from 'react'
import M from 'materialize-css'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import { Route, NavLink, HashRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// List Pages
import HomePage from './views/HomePage'
import SchedulePage from './views/SchedulePage'
import RulesPage from './views/RulesPage'
import ExhibitorsPage from './views/ExhibitorsPage'
import GuestsPage from './views/GuestsPage'
import MapsPage from './views/MapsPage'

// Detail Pages
import SingleEvent from './views/single/SingleEvent'
import SingleGuest from './views/single/SingleGuest'

// Components
import ExternalLink from './components/ExternalLink'
import Modal from './components/Modal'
import LoginForm from './components/auth/LoginForm'
import Helper from './components/Helper'

library.add(fab, faShareSquare)

class PublicMain extends Component {
  constructor (props) {
    super(props)

    if (Helper.checkSessionStorage()) {
      this.state = {
        registrationLink: '',
        socialFB: '',
        socialTW: '',
        socialIG: '',
        socialWeb: '',
        token: (sessionStorage.getItem('token')) ? sessionStorage.getItem('token') : ''
      }
    } else {
      this.state = {
        registrationLink: '',
        socialFB: '',
        socialTW: '',
        socialIG: '',
        socialWeb: '',
        token: ''
      }
    }

    this.onTokenUpdate = this.onTokenUpdate.bind(this)

    this.routes = [
      {
        path: '/',
        render: () => <HomePage token={this.state.token} />
      },
      {
        path: '/schedule',
        render: () => <SchedulePage token={this.state.token} />
      },
      {
        path: '/rules',
        render: () => <RulesPage token={this.state.token} />
      },
      {
        path: '/exhibitors',
        render: () => <ExhibitorsPage token={this.state.token} />
      },
      {
        path: '/guests',
        render: () => <GuestsPage token={this.state.token} />
      },
      {
        path: '/maps',
        render: () => <MapsPage token={this.state.token} />
      },
      {
        path: '/event/:eventId',
        render: ({ match }) => <SingleEvent eventId={match.params.eventId} token={this.state.token} />
      },
      {
        path: '/guest/:guestId',
        render: ({ match }) => <SingleGuest guestId={match.params.guestId} token={this.state.token} />
      }
    ]
  }

  onTokenUpdate (data) {
    this.setState({
      token: data
    })
    
    if (Helper.checkSessionStorage()) {
      sessionStorage.setItem('token', data)
    }
  }

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
          socialIG: response.data.social_ig,
          socialWeb: response.data.social_web
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
    M.Sidenav.init($('.sidenav'))
    M.Modal.init($('.modal'))
    M.FloatingActionButton.init($('.fixed-action-btn'))
  }

  render () {
    const routeComponents = this.routes.map(({ path, render }, key) => <Route exact path={path} render={render} key={key} />)

    return (
      <HashRouter>
        <ul id='sidebar' className='sidenav sidenav-fixed'>
          <li>
            <div className='user-view'>
              <span style={{ fontSize: '1.375rem' }}>{process.env.MIX_EVENT_NAME}</span>
              <div>
                { this.state && this.state.socialFB &&
                  <ExternalLink href={this.state.socialFB} icon>
                    <FontAwesomeIcon icon={['fab', 'facebook-square']} />
                  </ExternalLink>
                }
                { this.state && this.state.socialTW &&
                  <ExternalLink href={this.state.socialTW} icon>
                    <FontAwesomeIcon icon={['fab', 'twitter-square']} />
                  </ExternalLink>
                }
                { this.state && this.state.socialIG &&
                  <ExternalLink href={this.state.socialIG} icon>
                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                  </ExternalLink>
                }
                { this.state && this.state.socialWeb &&
                  <ExternalLink href={this.state.socialWeb} icon className='right'>
                    <FontAwesomeIcon icon='share-square' />
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
            <NavLink exact to='/' className='waves-effect sidenav-close'>
              <i className='material-icons'>home</i>General Information
            </NavLink>
          </li>
          <li>
            <NavLink to='/schedule' className='waves-effect sidenav-close'>
              <i className='material-icons'>web</i>Schedule
            </NavLink>
          </li>
          <li>
            <NavLink to='/guests' className='waves-effect sidenav-close'>
              <i className='material-icons'>people</i>Guests
            </NavLink>
          </li>
          <li>
            <NavLink to='/exhibitors' className='waves-effect sidenav-close'>
              <i className='material-icons'>shopping_cart</i>Exhibitors
            </NavLink>
          </li>
          <li>
            <NavLink to='/rules' className='waves-effect sidenav-close'>
              <i className='material-icons'>list_alt</i>Rules
            </NavLink>
          </li>
          <li>
            <NavLink to='/maps' className='wave-effect sidenav-close'>
              <i className='material-icons'>map</i>Maps
            </NavLink>
          </li>

          { this.state && !this.state.token &&
            <button
              id='login'
              data-target='loginModal'
              className='waves-effect waves-light btn btn-flat modal-trigger'
              style={{ position: 'absolute', bottom: '11vh', left: '36%' }}>Log in</button>
          }
        </ul>

        <header className='valign-wrapper navbar-fixed z-depth-1'>
          <a href='#' data-target='sidebar' className='sidenav-trigger'>
            <i className='material-icons'>menu</i>
          </a>
          <span>{process.env.MIX_EVENT_NAME}</span>
        </header>

        <main>
          { routeComponents }
        </main>

        { (this.state.token === '') ? (
          <Modal id='loginModal'>
            <LoginForm onTokenUpdate={this.onTokenUpdate} />
          </Modal>
        ) : null }
      </HashRouter>
    )
  }
}

export default PublicMain

if ($('#public-root').length) {
  ReactDOM.render(<PublicMain />, document.getElementById('public-root'))
}
