import React, {Component, PropTypes} from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from 'react-redux'
import validate from './loginValidate'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
        <div>
          <TextField hintText={label}
            floatingLabelText={label}
            errorText={touched && error}
            {...input}
            {...custom}
          />
        </div>
  )

const renderCheckbox = ({ input, label }) => (
  <Checkbox label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}/>
)

@reduxForm({
  form: 'login',
  validate
})
@connect(
  (state) => ({
    loginError: state.auth.loginError
  })
)

export default class LoginForm extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    loginError: PropTypes.object,
  }

  render() {
    const {
      handleSubmit,
      reset,
      pristine,
      submitting,
      loginError
      } = this.props
    const styles = require('./LoginForm.scss');
    return (
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <Field name="id" type="hidden" component="input" />
            <div>
              <Field name="username" component={renderTextField} label="Username" />
            </div>
            <div>
              <Field name="password" type="password" component={renderTextField} label="Password" />
            </div>
            <div className={styles.remember}>
              <Field name="remember" component={renderCheckbox} label="Remember"/>
            </div>
            <div>
              {loginError && <div className="text-danger">{loginError.response.text}</div>}
            </div>
            <div>
              <RaisedButton type="submit" label="Sigin" primary disabled={pristine || submitting} />
              <RaisedButton type="button" label="Sign Up" onClick={reset} style={{margin: 12}} />
            </div>
        </form>
    )
  }
}
