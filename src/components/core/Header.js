import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'underscore';

import config from '../utils/config';
import SearchForm from './SearchForm';

class Header extends React.Component {
  // getMeteorData() {
  //     return {
  //         apps: Application.find().fetch(),
  //         user: Meteor.user(),
  //         activeApp: Session.get('active.app'),
  //         currentRoute: FlowRouter.current().route.name
  //     };
  // }

  showCreateModal ()  {
    // Session.set('app.create.modal', true);
  };

  showSearch() {
      if (this.data.currentRoute === 'containersList' || this.data.currentRoute === 'itemsList') {
          return false;
      }

      return true;
  }

  logout () {
      // AccountsTemplates.logout();
      // Meteor.setTimeout(() => {
      //     FlowRouter.go('login');
      // }, 500);
  };

  renderApps() {
      if (this.data.apps.length === 0) {
          return;
      }

      const apps = this.data.apps.map((app) => (
        <a
          className="item"
          key={app._id}
          href={FlowRouter.path('containersList', {appId: app._id})}
        >
          <i className="caret right icon" /> {app.name}
        </a>
      ));

      return apps;
  }

  render() {
      return (
        <div className="ui fixed inverted top menu">
          <div className="ui fluid container">
            <Link to="/dashboard" className="header item">
              <img className="logo" src="/images/logo.png" alt="stackable logo" />
              {config.siteName}
              <div className="sub header">{config.siteDescription}</div>
            </Link>
            {this.showSearch() ?
              <div className="item">
                <SearchForm />
              </div>:''}
            <div className="item">
              <p className="active-site">
                {!_.isUndefined(this.data.activeApp) ? this.data.activeApp.name : ''}
              </p>
            </div>
            <div className="right item">
              <a onClick={() => this.logout()}>
                <i className="sign out icon" />
                          logout
              </a>
            </div>
            <div className="ui simple dropdown right item" style={{'marginLeft': '30px !important'}}>
                      Switch Stacks <i className="dropdown icon" />
              <div className="menu">
                {this.renderApps()}
                <a className="item" onClick={this.showCreateModal}>
                  <i className="plus icon" /> new stack
                </a>
              </div>
            </div>
          </div>
        </div>
      )
  }
};

export default Header;



// import React from 'react';
// import { Link } from 'react-router-dom';

// import config from '../utils/config';

// export default () => (
//   <nav className="navbar is-transparent" role="navigation" aria-label="dropdown navigation">
//     <Link className="navbar-item" to="/">
//       {config.siteName}
//     </Link>
//     <Link className="navbar-item" to="/">Home</Link>
//     <Link className="navbar-item" to="/about">About</Link>
//     <Link className="navbar-item" to="/contact">Contact</Link>
//     <Link className="navbar-item" to="/cars">Cars</Link>
//   </nav>
// );