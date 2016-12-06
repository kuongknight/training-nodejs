import React, {Component, PropTypes} from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import validate, { asyncValidate} from './bookValidation'
import {connect} from 'react-redux'
import * as bookActions from 'redux/modules/book';

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
@connect(
  state => ({
    editing: state.book.editing,
    saveError: state.book.saveError
  }),
  {...bookActions}
)

export default class BookForm extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    editing: PropTypes.object.isRequired,
    editStart: PropTypes.func.isRequired,
    saveError: PropTypes.object,
    form: PropTypes.string.isRequired
  }

  render() {
    const {
      handleSubmit,
      reset,
      pristine,
      submitting,
      editing: {show},
      editStart,
      form,
      saveError: { [form]: saveError }
      } = this.props
    const addBook = () => editStart(null);
    const styles = require('./BookForm.scss');
    return (
      <div>
        { !show ? <RaisedButton type="button" label="Add Book" primary onClick={addBook} /> :
          <form onSubmit={handleSubmit} className={styles.bookForm}>
            <Field name="id" type="hidden" component="input" />
            <div>
              <Field name="name" component={renderTextField} label="Book Name" />
            </div>
            <div>
              <Field name="title" component={renderTextField} label="Book Title" />
            </div>
            <div>
              <Field name="totalPage" component={renderTextField} label="Total Page" />
            </div>
            <div>
              <Field name="active" component={renderCheckbox} label="Active"/>
            </div>
            <div>
              <RaisedButton type="submit" label="Submit" primary disabled={pristine || submitting} />
              <RaisedButton type="button" label="Clear Values" secondary disabled={pristine || submitting} onClick={reset} style={{margin: 12}} />
            </div>
          </form>
        }
        {saveError && <div className="text-danger">{saveError}</div>}
      </div>
    )
  }
}
