import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false
    };
    this.onChangeShelf = this.onChangeShelf.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  onSearch(event) {
    let query = event.target.value
    BooksAPI.search(query).then((books) => {
      this.setState({ books })
    })
  }

  onChangeShelf(book, shelf) {
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
