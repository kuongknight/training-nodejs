import React, {Component, PropTypes} from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton';
import validate, { asyncValidate} from './bookValidation'

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
const renderCheckbox = ({ input, label }) => (
  <Checkbox label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}/>
)

@reduxForm({
  form: 'book',
  validate,
  asyncValidate,
  asyncBlurFields: ['name']
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
    return (
      <form onSubmit={handleSubmit} className={styles.bookForm}>
        <div>
          <Field name="name" component={renderTextField} label="Book Name"/>
        </div>
        <div>
          <Field name="title" component={renderTextField} label="Book Title"/>
        </div>
        <div>
          <Field name="totalPage" component={renderTextField} label="Total Page"/>
        </div>
        <div>
          <Field name="active" component={renderCheckbox} label="Active"/>
        </div>
        <div>
          <RaisedButton type="submit" label="Submit" primary disabled={pristine || submitting} />
          <RaisedButton type="button" label="Clear Values" secondary disabled={pristine || submitting} onClick={reset} style={{margin: 12}} />
        </div>
      </form>
    )
  }
}
