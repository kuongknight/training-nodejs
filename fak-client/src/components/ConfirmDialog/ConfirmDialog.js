import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'

export default class ConfirmDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false}
    this.actions = {}
  }
  show = (content) => {
    this.setState({content: content, show: true});
    return new Promise((reslove, reject)=> {
      this.actions.confirm = reslove;
      this.actions.cannel = reject;
    })
  }

  handleConfirm = () => {
    this.actions.confirm();
    this.setState({show: false});
  };

  handleClose = () => {
    this.actions.cannel();
    this.setState({show: false});
  };

  render() {
    return (
        <Modal show={this.state.show} dialogClassName="comfirm-modal">
          <Modal.Header>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.state.content}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleClose}>Cannel</Button>
            <Button onClick={this.handleConfirm} bsStyle="primary">Submit</Button>
          </Modal.Footer>

        </Modal>
    );
  }
}
