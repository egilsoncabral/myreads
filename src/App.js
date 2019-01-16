import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';
import BookList from './BookList'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books:[],
    categories: [
      {
        id:'currentlyReading',
        categorieName: 'Currently Reading',
        books:[]
      },
      {
        id:'wantToRead',
        categorieName: 'Want to Read',
        books:[]
      },
      {
        id:'read',
        categorieName: 'Read',
        books:[]
      }
    ]
  }

  changeShelf = (book, shelf) => {

    BooksAPI.update(book, shelf).then(() => {

      this.loadBooks();

    })
  }

  loadBooks(){
    let updatedCategories = this.state.categories;
    BooksAPI.getAll().then((books) => {
      updatedCategories.forEach(categorie => {
        categorie.books = []
        books.forEach(book => {
          if (book.shelf.toUpperCase() === categorie.id.toUpperCase()) {
            categorie.books.push(book);
          }
        });
      });
      this.setState({ categories: updatedCategories })
    })
  }

  componentWillMount(){
    this.loadBooks();
  }

  searchBooks(searchText){
    BooksAPI.search(searchText).then((books) => {

      this.setState({books:books})

    })
  }

  printResultSearchList(){
    let bookResultSection = [];
    this.state.books.forEach(book => {
      let authors = []
      book.authors.forEach(author => {
        authors.push(
          <span>{author}<br /></span>
        )
      });
      bookResultSection.push(
        <BookList book={book} authors={authors} changeShelf={this.changeShelf} />
      )
    })
    return bookResultSection
  }

  createBookSection(){
    let categorieSection =[];
    this.state.categories.forEach(categorie => {
      let bookSection = [];
      categorie.books.forEach(book => {
        let authors = []
        let authorsName = book.authors.map(
          text => text.charAt(0).toLowerCase() + text.slice(1).replace(/\s+/g, "")
        );
        authorsName.forEach((name, index) => {
          authors.push(
            <span key={name[index]}>{name}<br /></span> 
          )
        });
        
        bookSection.push(
            <BookList book={book} authors={authors} changeShelf={this.changeShelf} key={book.id}/>
        );
      });
        categorieSection.push(
          <div className="bookshelf" key={categorie.id}>
            <h2 className="bookshelf-title">{categorie.categorieName}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {bookSection}
              </ol>
            </div>
          </div>)  
      });  
    return categorieSection;
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onKeyUp={event => this.searchBooks(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.printResultSearchList()}
              </ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.createBookSection()}
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
