import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import {Grid} from 'react-bootstrap'
import { asyncConnect } from 'redux-async-connect'
import {connect} from 'react-redux'
import {load as loadActive, active as activedUser} from 'redux/modules/active'
import { push } from 'react-router-redux'
import DialogUI from 'components/DialogUI/DialogUI'

@asyncConnect([{
  promise: ({store: {dispatch, getState}, params: {token}}) => {
    const promises = [];
    if (!loadActive( getState() )) {
      promises.push(dispatch(activedUser(token)));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    isActive: state.activeAccount.isActive,
    user: state.auth.user
  }),
  {push}
)
export default class Active extends Component {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    user: PropTypes.object
  }
  handleClose = () => {
    if (this.props.user) {
      this.props.push('/');
    }else {
      this.props.push('/login');
    }
  }
  render() {
    const{isActive} = this.props
    return (
      <Grid>
        <Helmet title="Active"/>
        <DialogUI open handleClose={this.handleClose} title={isActive ? 'Active completed!' : 'Active failed!'}>
          {isActive ? 'Go to login page and do login!' : 'Error when try active user!'}
        </DialogUI>
      </Grid>
    )
  }
}
