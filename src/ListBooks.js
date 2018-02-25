import React, { Component } from 'react'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  render() {

    let currentlyReading = this.props.books.filter((book) => { return book.shelf === 'currentlyReading'})
    let wantToRead = this.props.books.filter((book) => { return book.shelf === 'wantToRead'})
    let read = this.props.books.filter((book) => { return book.shelf === 'read'})

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              books={currentlyReading}
              title='Currently Reading'
            />
            <Bookshelf
              books={read}
              title='Read'
            />
            <Bookshelf
              books={wantToRead}
              title='Want To Read'
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks
