import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import BookForm from 'components/BookForm/BookForm'
@connect(
  () => ({}),
  {initialize})
export default class Book extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    window.alert('Data submitted! ' + JSON.stringify(data));
    this.props.initialize('book', {});
  }
  render() {
    return (
      <div>
          <BookForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}
