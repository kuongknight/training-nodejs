import React, {Component} from 'react';
import Helmet from 'react-helmet';
import BookForm from 'components/BookForm/BookForm'

export default class About extends Component {

  state = {
    showKitten: false
  }

  handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});

  render() {
    const {showKitten} = this.state;
    const kitten = require('./kitten.jpg');
    return (
      <div className="container">
        <h1>Demo</h1>
        <Helmet title="About Us"/>
        {showKitten && <div><img src={kitten}/></div>}
        <BookForm handleSubmit={this.handleToggleKitten.bind(this)} />
      </div>
    );
  }
}
