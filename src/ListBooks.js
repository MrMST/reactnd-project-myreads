import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  render() {

    const { books, onChangeShelf } = this.props

    let currentlyReading = books.filter((book) => { return book.shelf === 'currentlyReading'})
    let wantToRead = books.filter((book) => { return book.shelf === 'wantToRead'})
    let read = books.filter((book) => { return book.shelf === 'read'})

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
              onChangeShelf={onChangeShelf}
            />
            <Bookshelf
              books={read}
              title='Read'
              onChangeShelf={onChangeShelf}
            />
            <Bookshelf
              books={wantToRead}
              title='Want To Read'
              onChangeShelf={onChangeShelf}
            />
          </div>
        </div>
        <div className="open-search">
              <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
