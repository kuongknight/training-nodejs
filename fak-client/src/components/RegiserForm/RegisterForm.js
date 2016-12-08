import React, {Component, PropTypes} from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import validate, { asyncValidate} from './registerValidation'
import {connect} from 'react-redux'
import DialogUI from 'components/DialogUI/DialogUI'
import * as registerActions from 'redux/modules/auth'

const renderTextField = ({ input, label, meta: { touched, error, asyncValidating }, ...custom }) => (
        <div>
          <TextField hintText={label}
            floatingLabelText={label}
            errorText={touched && error}
            {...input}
            {...custom}
          />
          { asyncValidating && <i className={'fa fa-cog fa-spin cog'}/> }
        </div>
  )

@reduxForm({
  form: 'register',
  validate,
  asyncValidate,
  asyncBlurFields: ['username']
})
@connect(
  state => ({
    saveError: state.register.saveError
  }),
  {...registerActions}
)

export default class RegisterForm extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    toggleRegister: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
  }
  render() {
    const {
      handleSubmit,
      reset,
      pristine,
      submitting,
      saveError,
      toggleRegister
      } = this.props
    const styles = require('./RegisterForm.scss');
    return (
      <DialogUI open title="Register From" handleClose={toggleRegister}>
        <form onSubmit={handleSubmit} className={styles.register}>
          <div>
            <Field name="username" component={renderTextField} label="Username" />
          </div>
          <div>
            <Field name="password" type="password" component={renderTextField} label="Password" />
          </div>
          <div>
            <Field name="rePassword" type="password" component={renderTextField} label="Re password" />
          </div>
          <div>
              {saveError && <div className="text-danger">{saveError.response.text}</div>}
          </div>
          <div>
            <RaisedButton type="submit" label="Submit" primary disabled={pristine || submitting} />
            <RaisedButton type="button" label="Clear Values" secondary disabled={pristine || submitting} onClick={reset} style={{margin: 12}} />
          </div>
        </form>
      </DialogUI>
    )
  }
}
