import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {DropdownButton, MenuItem, Pagination} from 'react-bootstrap'
import * as bookActions from 'redux/modules/book'
import {initialize} from 'redux-form'

@connect(
  state => ({books: state.book.data}),
  {...bookActions, initialize}
)
export default class BookList extends Component {
  static propTypes = {
    books: PropTypes.array,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired
  }
  handledSelect = (eventKey) => console.log(eventKey);
  render() {
    const {books, editStart, deleteBook} = this.props
    const styles = require('./BookList.scss');
    return (
      <div className={styles.bookList}>
        {books && books.length !== 0 &&
          <div>
          <Table selectable={false} >
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn key="id" >ID</TableHeaderColumn>
                <TableHeaderColumn key="name" >Name</TableHeaderColumn>
                <TableHeaderColumn key="title" >Title</TableHeaderColumn>
                <TableHeaderColumn key="status" >Status</TableHeaderColumn>
                <TableHeaderColumn key="created_at" >Create Date</TableHeaderColumn>
                <TableHeaderColumn key="action" >Action</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} stripedRows >
              {
                books.map( book =>
                  <TableRow key={book.id}>
                    <TableRowColumn>{book.id}</TableRowColumn>
                    <TableRowColumn>{book.name}</TableRowColumn>
                    <TableRowColumn>{book.title}</TableRowColumn>
                    <TableRowColumn>{book.active ? 'Active' : 'Disable'}</TableRowColumn>
                    <TableRowColumn>{book.created_at}</TableRowColumn>
                    <TableRowColumn className={styles.noOverflow}>
                      <DropdownButton id={book.id} bsStyle="info" title="Action" >
                         <MenuItem eventKey="EDIT_BOOK" onClick={() => {editStart(book); this.props.initialize('book', book);} }>Edit</MenuItem>
                         <MenuItem eventKey="DEL_BOOK" onClick={()=> deleteBook(book)}>Delete</MenuItem>
                      </DropdownButton>
                    </TableRowColumn>
                  </TableRow>
              )}
            </TableBody>
          </Table>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={20}
            maxButtons={5}
            activePage={1}
            onSelect={this.handledSelect} />
          </div>
        }
      </div>
    )
  }
}
