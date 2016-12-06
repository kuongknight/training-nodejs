import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {initialize} from 'redux-form'
import BookForm from 'components/BookForm/BookForm'
import * as bookActions from 'redux/modules/book'
import BookList from 'components/BookList/BookList'
import Helmet from 'react-helmet'
import {isLoaded, load as loadBooks} from 'redux/modules/book'
import { asyncConnect } from 'redux-async-connect'
import {Grid} from 'react-bootstrap'

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadBooks());
    }
  }
}])

@connect(
  () => ({}),
  {...bookActions, initialize})
export default class Book extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    this.props.save(data)
      .then(result => {
        if (result && typeof result.error === 'object') {
          return Promise.reject(result.error);
        }
        this.props.initialize('book', {});
      })
  }
  render() {
    const styles = require('./Book.scss');
    return (
      <Grid className={styles.book}>
          <Helmet title="Book"/>
          <BookForm onSubmit={this.handleSubmit} />
          <BookList />
      </Grid>
    )
  }
}
