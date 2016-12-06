import React, {Component, PropTypes} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class ConfirmDialog extends Component {
  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired
  }
  constructor(props) {
    super(props);
    this.state = { open: props.open}
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {onConfirm, content} = this.props
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={() => { this.handleClose(); onConfirm();} }
      />,
      <FlatButton
        label="Submit"
        primary
        disabled
        onTouchTap={this.handleClose}
      />,
    ];

    return (
        <Dialog
          title="Are you sure to invoke this action?"
          actions={actions}
          modal
          open={this.state.open}
        >
          {content}
        </Dialog>
    );
  }
}
