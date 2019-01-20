import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';
import BookList from './BookList'
import { Link } from 'react-router-dom'

class SearchBook extends React.Component {

  state = {
    books: [],
    bookSearchList: [],
  }

  checkShelf = list => {
    return list.map(book => {

      const myBook = this.props.books.find(el => el.id === book.id);
      if (myBook) {
        book.shelf = myBook.shelf;
      }
      return book;
    });
  };

  changeShelf = (book, shelf) => {

    BooksAPI.update(book, shelf).then(() => {
      let booksOnSearchList = this.state.books;
      booksOnSearchList.forEach(bookElem => {
        if (bookElem.id === book.id) {
          bookElem.shelf = shelf
        }
      });

      this.setState({ books: booksOnSearchList })

    })
  }

  printResultSearchList() {
    let bookResultSection = [];
    if (this.state.books.length > 0) {
      this.state.books.forEach(book => {
        bookResultSection.push(
          <BookList book={book} changeShelf={this.changeShelf} key={book.id} />
        )
      })
    }

    return bookResultSection
  }

  searchBooks(searchText) {
    if (!searchText) {
      this.setState({ books: [] });
      return;
    }
    BooksAPI.search(searchText).then((queryBooks) => {
      // Se queryBooks n eh undefined e nao possui a propriedade error
      if (queryBooks && !queryBooks.error) {
        this.checkShelf(queryBooks);
        this.setState({ books: queryBooks })
        this.setState({ bookSearchList: this.printResultSearchList() })
      }
    })
  }


  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" placeholder="Search by title or author" onKeyUp={event => this.searchBooks(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" ref={this.bookGrid}>
            {this.state.bookSearchList}
          </ol>
        </div>
      </div>)
  }
}
export default SearchBook;