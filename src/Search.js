import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {

  state = {
    books: [],
  };

  onSearch = (event) => {
    const booksAlreadyOnShelf = this.props.books;

    this.setState({ books: [] });

    const query = event.target.value.trim();

    if (!query || query.length < 3) {
      return;
    }

    BooksAPI.search(query, 20).then((books) => {
      if(!books || books.error) {
        return;
      }

      books = books.map((book) => {
        const bookOnShelf = booksAlreadyOnShelf.find(shelfBook => shelfBook.id === book.id);
        book.shelf = (bookOnShelf) ? bookOnShelf.shelf: "none";
        return book;
      })

      this.setState({ books });
    })
  }

  render() {
    const {onChangeShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search"  to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input onChange={ this.onSearch } type="text" placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.books.map((book => (
              <Book
                key={book.id}
                book={book}
                onChangeShelf={onChangeShelf}
                />
            )))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
