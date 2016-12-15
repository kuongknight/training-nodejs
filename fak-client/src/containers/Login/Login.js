import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import {Grid} from 'react-bootstrap'
import LoginForm from 'components/LoginForm/LoginForm'
import * as authActions from 'redux/modules/auth'
import * as registerActions from 'redux/modules/register'
import {connect} from 'react-redux'
import { initialize } from 'redux-form'
import RegisterForm from 'components/RegisterForm/RegisterForm'

@connect(
  state => ({
    user: state.auth.user,
    openRegister: state.register.openRegister
  }),
  {...authActions, ...registerActions, initialize}
)

export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    openRegister: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    toggleRegister: PropTypes.func.isRequired
  }

  handleSubmitLogin = (data) => {
    this.props.login(data)
      .then(result => {
        if (result && typeof result.error === 'object') {
          return Promise.reject(result.error);
        }
      })
  }
  handleSubmitFormRegister = (data) => {
    this.props.registerUser(data)
      .then((result) => {
        if (result.username && result.password) {
          this.props.toggleRegister();
          this.props.initialize('login', result);
          this.handleSubmitLogin(result);
        }
      })
  }
  render() {
    const {user, openRegister} = this.props
    const styles = require('./Login.scss');
    return (
      <Grid className={styles.login}>
          <Helmet title="Login"/>
          <h3>Login to system</h3>
          { (user && user.username) ? 'You are login with username: ' + user.username : <LoginForm onSubmit={this.handleSubmitLogin} />}
          {openRegister && <RegisterForm onSubmit={this.handleSubmitFormRegister} />}
      </Grid>
    )
  }
}
