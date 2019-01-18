import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';
import BookList from './BookList'
import {Link} from 'react-router-dom'
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
         /**
          * TODO: Instead of using this state variable to keep track of which page
          * we're on, use the URL in the browser's address bar. This will ensure that
          * users can use the browser's back and forward buttons to navigate between
          * pages, as well as provide a good URL they can bookmark and share.
          */
         books:this.props.books,
         categories: this.props.categories
       }
     
     }

     changeShelf = (book, shelf) => {
   
        BooksAPI.update(book, shelf).then(() => {
         this.loadBooks();
    
        })
      }
     
     loadBooks(){
       let updatedCategories = this.props.categories;
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
   
     createBookSection(){
       let categorieSection =[];
       this.props.categories.forEach(categorie => {
         let bookSection = [];
         categorie.books.forEach(book => {
           bookSection.push(
               <BookList book={book} authors={this.props.authors(book)} changeShelf={this.changeShelf} key={book.id}/>
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
                    <Link to='/search'><button>Add a book</button></Link>
                </div>
              </div>
            
        )
      }
}
export default Home