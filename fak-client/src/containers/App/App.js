import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }
}])

@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const styles = require('./App.scss');
    const {user} = this.props;
    return (
      <MuiThemeProvider>
        <div className={styles.app}>
          <Helmet {...config.app.head}/>
          <Navbar fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                  <div className={styles.brand}/>
                  <span>{config.app.title}</span>
                </IndexLink>
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav navbar>
                <LinkContainer to="/book">
                  <NavItem eventKey={1}>Book</NavItem>
                </LinkContainer>
                {!user &&
                <LinkContainer to="/login">
                  <NavItem eventKey={2}>Login</NavItem>
                </LinkContainer>}
              </Nav>
              { user &&
                <Nav navbar pullRight>
                  <NavItem eventKey={3} target="_blank" title="KuongKnight" href="https://github.com/kuongknight">
                    <i className="fa fa-github"/>{user.username}
                  </NavItem>
                  <LinkContainer to="/logout">
                    <NavItem eventKey={4} onClick={this.handleLogout} >Logout</NavItem>
                  </LinkContainer>
                </Nav>
              }
            </Navbar.Collapse>
          </Navbar>

          <div className={styles.appContent}>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
