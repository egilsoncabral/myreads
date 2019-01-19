import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';
import BookSection from './BookSection'
import { Link } from 'react-router-dom'
class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      books: [],
    }

  }

  changeShelf = (book, shelf) => {

    BooksAPI.update(book, shelf).then(() => {
      this.loadBooks();

    })
  }

  loadBooks() {
    BooksAPI.getAll().then((books) => {

      this.setState({ books: books })
    })
  }

  componentWillMount() {
    this.loadBooks();
  }

  getBooksByShelf(categorie) {
    return this.state.books.filter(book => book.shelf === categorie)
  }

  getShelfId(shelfName) {
    return shelfName.charAt(0).toLowerCase() + shelfName.slice(1).replace(/\s+/g, "")
  }

  createBookSection() {
    return this.props.categories.map(categorie =>
      <div className="bookshelf" key={this.getShelfId(categorie)}>
        <h2 className="bookshelf-title">{categorie}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <BookSection books={this.getBooksByShelf(this.getShelfId(categorie))} changeShelf={this.changeShelf.bind(this)} key={categorie.id} />
          </ol>
        </div>
      </div>
    );

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