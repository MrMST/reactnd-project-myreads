import React, { Component } from 'react'

class Bookshelf extends Component {
  render() {
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
