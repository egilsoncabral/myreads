import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';
import BookList from './BookList'
import SearchBooks from './SearchBooks';
import Home from './Home'
import {Router, Route} from 'react-router-dom'

class BooksApp extends React.Component {

  constructor(props){
    super(props);
    this.state = {
     /**
      * TODO: Instead of using this state variable to keep track of which page
      * we're on, use the URL in the browser's address bar. This will ensure that
      * users can use the browser's back and forward buttons to navigate between
      * pages, as well as provide a good URL they can bookmark and share.
      */
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
  
  
  getBookAuthors(book){
    let authors = []
    let authorsName = []
    if (book.authors !== undefined) {
        authorsName = book.authors
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
  
  render() {
    return (
      
      <div>
        <Route exact path="/" render={() => <Home
          categories={this.state.categories}
          authors={this.getBookAuthors.bind(this)} />} />
        <Route path="/search" render={() => <SearchBooks
          categories={this.state.categories}
          authors={this.getBookAuthors.bind(this)}
        />} />
      </div>

    )
  }
}

export default BooksApp
