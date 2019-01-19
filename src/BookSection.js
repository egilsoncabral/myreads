import React from 'react'
import BookList from './BookList'

class BookSection extends React.Component{

    createBookList(){
        return this.props.books.map(book => 
            <BookList book={book} changeShelf={this.props.changeShelf} key={book.id}/>
        );
        
    }

    render(){
        return(
            this.createBookList()
        )
    }

}
export default BookSection   