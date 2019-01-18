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
        
        return(
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")` }}></div>
                        <div className="book-shelf-changer" onClick={this.triggerOptions}>
                            <Options
                                open={this.state.showOptions}
                                book={this.props.book}
                                texts={["Currently Reading", "Want To Read", "Read", "None"]}
                                changeShelf={this.props.changeShelf}
                                trigger={this.triggerOptions} />
                        
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{this.props.authors}</div>
                </div>
            </li>
        )
    }
}

export default BookList;