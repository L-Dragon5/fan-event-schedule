import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, NavLink, HashRouter } from "react-router-dom";

// Views
import HomePage from "./views/HomePage";
import SchedulePage from "./views/SchedulePage";

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path:'/schedule',
    component: SchedulePage,
  }
];

class PublicMain extends Component {
  render() {
    const routeComponents = routes.map( ({path, component}, key) => <Route exact path={path} component={component} key={key} />);
    
    return (
      <HashRouter>
        <ul id="sidebar" className="sidenav sidenav-fixed">
          <li>
            <div className="user-view">
              <span className="name">{process.env.MIX_EVENT_NAME}</span>
            </div>
          </li>
          <li><div className="divider" /></li>
          <li>
            <NavLink exact to="/" className="waves-effect">
              <i className="material-icons">home</i>General Information
            </NavLink>
          </li>
          <li>
            <NavLink to="/schedule" className="waves-effect">
              <i className="material-icons">web</i>Schedule
            </NavLink>
          </li>
        </ul>

        <header className="valign-wrapper">
          <a href="#" data-target="sidebar" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <span>{process.env.MIX_EVENT_NAME}</span>
        </header>

        <main>
          { routeComponents }
        </main> 
      </HashRouter>
    );
  }
}

export default PublicMain;

if (document.getElementById("public-root")) {
  ReactDOM.render(<PublicMain />, document.getElementById("public-root"));

  document.addEventListener("DOMContentLoaded", () => {
    let elem = document.querySelector(".sidenav");
    let instance = M.Sidenav.init(elem);
  });
}
