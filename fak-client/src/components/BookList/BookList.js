import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {DropdownButton, MenuItem} from 'react-bootstrap'
import * as bookActions from 'redux/modules/book'

@connect(
  state => ({books: state.book.data}),
  {...bookActions}
)
export default class BookList extends Component {
  static propTypes = {
    books: PropTypes.array,
    load: PropTypes.func.isRequired
  }
  render() {
    const {books} = this.props
    return (
      <div>
        {books && books.length &&
          <Table selectable={false}>
            <TableHeader enableSelectAll={false}>
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
                    <TableRowColumn>{book.active}</TableRowColumn>
                    <TableRowColumn>{book.created_at}</TableRowColumn>
                    <TableRowColumn style={{overflow: 'inherit'}}>
                      <DropdownButton id={book.id} bsStyle="info" title="Action" >
                         <MenuItem eventKey="EDIT_BOOK">Edit</MenuItem>
                         <MenuItem eventKey="DEL_BOOK">Delete</MenuItem>
                      </DropdownButton>
                    </TableRowColumn>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        }
      </div>
    )
  }
}
