import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import {Grid} from 'react-bootstrap'
import LoginForm from 'components/LoginForm/LoginForm'
import * as authActions from 'redux/modules/auth';
import {connect} from 'react-redux';

@connect(
  state => ({user: state.auth.user}),
  authActions
)

export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    console.log(data);
    this.props.login(data)
      .then(result => {
        console.log(result);
        if (result && typeof result.error === 'object') {
          return Promise.reject(result.error);
        }
      })
  }
  render() {
    const {user} = this.props
    const styles = require('./Login.scss');
    return (
      <Grid className={styles.login}>
          <Helmet title="Login"/>
          <h3>Login to system</h3>
          { (user && user.username) ? 'You are login with username: ' + user.username : <LoginForm onSubmit={this.handleSubmit} />}
      </Grid>
    )
  }
}
