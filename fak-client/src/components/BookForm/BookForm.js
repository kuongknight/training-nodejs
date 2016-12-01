import React, {Component, PropTypes} from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton';
import validate, { asyncValidate} from './bookValidation'

@reduxForm({
  form: 'book',
  validate,
  asyncValidate,
  asyncBlurFields: ['email']
})

export default class BookForm extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired
  }
  render() {
    const {
      handleSubmit,
      reset,
      pristine,
      submitting
      } = this.props
    const styles = require('./BookForm.scss');
    const renderTextField = ({ input, label, meta: { touched, error, asyncValidating }, ...custom }) => (
      <div>
        <TextField hintText={label}
          floatingLabelText={label}
          errorText={touched && error}
          {...input}
          {...custom}
        />
        { asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/> }
      </div>
    )

    const renderCheckbox = ({ input, label }) => (
      <Checkbox label={label}
        checked={input.value ? true : false}
        onCheck={input.onChange}/>
    )

    const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
      <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}/>
    )

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="name" component={renderTextField} label="Book Name"/>
        </div>
        <div>
          <Field name="title" component={renderTextField} label="Book Title"/>
        </div>
        <div>
          <Field name="email" component={renderTextField} label="Email"/>
        </div>
        <div>
          <Field name="favoriteColor" component={renderSelectField} label="Favorite Color">
            <MenuItem value={'ff0000'} primaryText="Red"/>
            <MenuItem value={'00ff00'} primaryText="Green"/>
            <MenuItem value={'0000ff'} primaryText="Blue"/>
          </Field>
        </div>
        <div>
          <Field name="employed" component={renderCheckbox} label="Employed"/>
        </div>
        <div>
          <Field name="notes" component={renderTextField} label="Notes" multiLine rows={2}/>
        </div>
        <div>
          <RaisedButton type="submit" label="Submit" primary disabled={pristine || submitting} />
          <RaisedButton type="button" label="Clear Values" secondary disabled={pristine || submitting} onClick={reset} style={{margin: 12}} />
        </div>
      </form>
    )
  }
}
