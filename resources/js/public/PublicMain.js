import axios from 'axios'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import { Route, NavLink, HashRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// Pages
import HomePage from './views/HomePage'
import SchedulePage from './views/SchedulePage'
import RulesPage from './views/RulesPage'
import SellersPage from './views/SellersPage'
import GuestsPage from './views/GuestsPage'

// Components
import SingleEvent from './components/SingleEvent'
import SingleGuest from './components/SingleGuest'
import ExternalLink from './components/ExternalLink'
import Modal from './components/Modal'
import LoginButton from './components/auth/LoginButton'

library.add(fab, faShareSquare)

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/schedule',
    component: SchedulePage
  },
  {
    path: '/rules',
    component: RulesPage
  },
  {
    path: '/exhibitors',
    component: SellersPage
  },
  {
    path: '/guests',
    component: GuestsPage
  },
  {
    path: '/event/:eventId',
    component: SingleEvent
  },
  {
    path: '/guest/:guestId',
    component: SingleGuest
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
          socialIG: response.data.social_ig,
          socialWeb: response.data.social_web
        })
      }
    })

    // Check if logged in
    axios.get('/api/user/canEdit').then(response => {
      if (response.data && response.data != null) {
        this.setState({
          loggedIn: true
        })
      } else {
        this.setState({
          loggedIn: false
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
              <span style={{ fontSize: '2.2rem' }}>{process.env.MIX_EVENT_NAME}</span>
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

          { (this.state && this.state.loggedIn) ? (
            <button
              id='logout'
              className='waves-effect waves-light btn red lighten-2'
              style={{ position: 'absolute', bottom: '6%', left: '36%' }}>Logout</button>
          ) : (
            <button
              id='login'
              data-target='loginModal'
              className='waves-effect waves-light btn modal-trigger'
              style={{ position: 'absolute', bottom: '6%', left: '36%' }}>Login</button>
          )};
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

        <Modal id='loginModal' button='Login'>
          <div className='row'>
            <form className='col s12'>
              <div className='row'>
                <div id='loginModalErrors' className='col s12' />
                <div className='input-field col s12'>
                  <input id='email' type='email' name='email' className='validate' />
                  <label htmlFor='email'>Email</label>
                </div>
                <div className='input-field col s12'>
                  <input id='password' type='password' className='validate' />
                  <label htmlFor='password'>Password</label>
                </div>
                <div className='right-align'>
                  <LoginButton modalId='loginModal' />
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </HashRouter>
    )
  }
}

export default PublicMain

if ($('#public-root').length) {
  ReactDOM.render(<PublicMain />, document.getElementById('public-root'))

  $(function () {
    M.Sidenav.init($('.sidenav'))
    M.Modal.init($('.modal'))
  })
}
