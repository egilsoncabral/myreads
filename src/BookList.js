import React from 'react'
import './App.css'
import styled from "styled-components";

const texts= ["Currently Reading", "Want To Read", "Read", "None"]

const TheOptions = styled.ul`
  display: ${props => (props.open ? "block" : "none")};
  position: absolute;
  width: 21rem;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  padding: 1rem;
  top: 100%;
  left: -7rem;
  list-style: none;
  z-index: 999;
`;

const Option = styled.li`
  transition: all 0.5s ease;
  cursor: pointer;
  padding: 1rem;
  border-radius: 0.3rem;
  background-color: ${props => (props.checked ? "#eee" : "white")};

  &:hover {
    background-color: #eee;
  }
`;

class BookList extends React.Component{
    state = {
        showOptions: false
    }

    shelves = texts.map(
        text => text.charAt(0).toLowerCase() + text.slice(1).replace(/\s+/g, "")
    );

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
                        <TheOptions value={this.props.shelf} onChange={() => this.triggerOptions()} open={this.state.showOptions} onMouseLeave={() => this.triggerOptions()}>
                            {texts.map((text, index) => (
                                <Option
                                    key={this.props.book.id + this.shelves[index]}
                                    value={this.shelves[index]}
                                    checked={this.shelves[index] === this.props.book.shelf}
                                    onClick={(event) => {
                                        this.triggerOptions();
                                        this.props.changeShelf(this.props.book, event.target.getAttribute("value"))
                                        
                                    }}>
                                    {text}
                                </Option>
                            ))}

                        </TheOptions>
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