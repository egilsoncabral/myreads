import React from 'react'
import './App.css'
import SearchBooks from './SearchBooks';
import Home from './Home'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      categories: ["Currently Reading", "Want To Read", "Read", "None"]
    }
 
 }
  
  render() {
    return (
      
      <div>
        <Route exact path="/" render={() => <Home
          categories={this.state.categories}
          />} />
        <Route path="/search" render={() => <SearchBooks
          categories={this.state.categories}
          />} />
      </div>

    )
  }
}

export default BooksApp
