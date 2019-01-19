import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';
import BookList from './BookList'
import {Link} from 'react-router-dom'

class SearchBook extends React.Component{

    state = {
        books: [],
        bookSearchList: [],
    }

    getShelfId(shelfName) {
      return shelfName.charAt(0).toLowerCase() + shelfName.slice(1).replace(/\s+/g, "")
    }
    checkShelf = list => {
        return list.map(book => {
          // Procura nos livros que ja estao estao na estantes
          // um livro igual ao atualmente sendo selecionado no loop
          let myBook
          this.props.categories.forEach(categorie => {
            categorie.books.forEach(element => {
                if (element.id === book.id) {
                  myBook = element
                }
            });
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

    changeShelf = (book, shelf) => {

        BooksAPI.update(book, shelf).then(() => {
            let booksOnSearchList = this.state.books;
            booksOnSearchList.forEach(bookElem => {
                if (bookElem.id === book.id) {
                  bookElem.shelf = shelf
                }
            });
            
            this.setState({books: booksOnSearchList})
    
        })
      }  

    printResultSearchList(){
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

   
    render(){
        return(
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
            </div>  )
    }
}
export default SearchBook;