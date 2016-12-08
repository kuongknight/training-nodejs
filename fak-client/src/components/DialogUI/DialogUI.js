import React, {Component, PropTypes} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class DialogUI extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    children: PropTypes.node,
    handleClose: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = { open: props.open}
  }

  handleClose = () => {
    if (this.props.handleClose) {
      this.props.handleClose()
    }else {
      this.setState({open: false});
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary
        keyboardFocused
        onTouchTap={this.handleClose}
      />
    ];
    const {title} = this.props;
    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
      {this.props.children}
      </Dialog>
    );
  }
}
