import React from 'react'
import './App.css'
import SearchBooks from './SearchBooks';
import Home from './Home'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      categories: ["Currently Reading", "Want To Read", "Read", "None"],
      books:[]
    }
 
 }

 loadBooks() {
  BooksAPI.getAll().then((books) => {
    
    this.setState({ books: books })
  })
}


  
  render() {
    return (
      
      <div>
        <Route exact path="/" render={() => <Home
          categories={this.state.categories}
          books={this.state.books}
          loadBooks={this.loadBooks.bind(this)}
          />} />
        <Route path="/search" render={() => <SearchBooks
          books={this.state.books}
          />} />
      </div>

    )
  }
}

export default BooksApp
