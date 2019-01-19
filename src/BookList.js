import React from 'react'
import './App.css'
import Options from './Options'

class BookList extends React.Component{
    state = {
        showOptions: false
    }

    triggerOptions = () => {
        this.setState({ showOptions: !this.state.showOptions });
    };

    render(){
        const { book } = this.props
        return(
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail: ''}")` }}></div>
                        <div className="book-shelf-changer" onClick={this.triggerOptions}>
                            <Options
                                open={this.state.showOptions}
                                book={book}
                                texts={["Currently Reading", "Want To Read", "Read", "None"]}
                                changeShelf={this.props.changeShelf}
                                trigger={this.triggerOptions} />
                        
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors ? book.authors.map((b, index) => book.authors.length > 1 ? b + ', ': b) : 'Not Specified'}</div>
                </div>
            </li>
        )
    }
}

export default BookList;