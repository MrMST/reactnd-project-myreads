import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  onSearch = (event) => {
    let query = event.target.value

    BooksAPI.search(query).then((books) => {
      books = books || []
      this.setState({ books })
    })
  }

  onChangeShelf = (book, shelf) => {
    book.shelf = shelf
    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== book.id)
        .concat([book])
    }))
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <Search
            books={this.state.books}
            onSearch={this.onSearch}
            onChangeShelf={this.onChangeShelf}
          />
        )}/>
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onChangeShelf={this.onChangeShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
