import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';
import BookList from './BookList'

class BooksApp extends React.Component {

  constructor(props){
     super(props);
     this.bookGrid = React.createRef();
     this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false,
      bookSearchList: [],
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
        },
        {
          id:'none',
          categorieName: 'None',
          books:[]
        }

      ]
    }
  
  }
  
  
  changeShelf = (book, shelf) => {

    BooksAPI.update(book, shelf).then(() => {
      let booksOnSearchList = this.state.books;
      booksOnSearchList.forEach(bookElem => {
          if (bookElem.id === book.id) {
            bookElem.shelf = shelf
          }
      });
      
      this.setState({books: booksOnSearchList})
      //this.checkShelf(this.state.books)
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

  checkShelf = list => {
    // Mapeia lista e retorna um novo array
    return list.map(book => {
      // Procura nos livros que ja estao estao na estantes
      // um livro igual ao atualmente sendo selecionado no loop
      let myBook
      this.state.categories.forEach(categorie => {
        categorie.books.forEach(element => {
            if (element.id === book.id) {
              myBook = element
            }
        });
        //myBook = categorie.books.find(el => el.id === book.id)
      });
      

      // Se for achado, define shelf deste livro
      if (myBook) {
        book.shelf = myBook.shelf;
      }else{
        book.shelf = 'none'
      }

      // Retorna o livro pra ser adicionado na nova array do map
      return book;
    });
  };

  searchBooks(searchText){
    BooksAPI.search(searchText).then((queryBooks) => {
      if (!searchText) {
        this.setState({ books: [] });
        return;
      }

      // Se queryBooks n eh undefined e nao possui a propriedade error
      if (queryBooks && !queryBooks.error) {
        this.checkShelf(queryBooks);
        this.setState({books:queryBooks})
        this.setState({bookSearchList: this.printResultSearchList()})
      }
      
      
    })
  }

  getBookAuthors(book){
    let authors = []
    let authorsName = []
    if (book.authors !== undefined) {
        authorsName = book.authors.map(
        text => text.charAt(0).toLowerCase() + text.slice(1).replace(/\s+/g, "")
      );  
    } else{
      authorsName[0] = 'Not specified'
    }
    
    authorsName.forEach((name, index) => {
      authors.push(
        <span key={name[index]}>{name}<br /></span>
      )
    });
    return authors
  }

  printResultSearchList(){
    let bookResultSection = [];
    if (this.state.books.length > 0) {
      this.state.books.forEach(book => {
        bookResultSection.push(
          <BookList book={book} authors={this.getBookAuthors(book)} changeShelf={this.changeShelf} key={book.id} />
        )
      })
    }
    
    return bookResultSection
  }

  

  createBookSection(){
    let categorieSection =[];
    this.state.categories.forEach(categorie => {
      let bookSection = [];
      categorie.books.forEach(book => {
        bookSection.push(
            <BookList book={book} authors={this.getBookAuthors(book)} changeShelf={this.changeShelf} key={book.id}/>
        );
      });
        if (categorie.id !== 'none') {
          categorieSection.push(
            <div className="bookshelf" key={categorie.id}>
              <h2 className="bookshelf-title">{categorie.categorieName}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {bookSection}
                </ol>
              </div>
            </div>)  
        }
        
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
              <ol className="books-grid" ref={this.bookGrid}>
                {this.state.bookSearchList}
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
