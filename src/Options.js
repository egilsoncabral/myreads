import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
|--------------------------------------------------
| STYLES
|--------------------------------------------------
*/
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

/**
|--------------------------------------------------
| COMPONENT
|--------------------------------------------------
*/

function Options({ book, changeShelf, texts, open, trigger }) {
  const shelf = book.shelf ? book.shelf : "none";
  const shelves = texts.map(
    text => text.charAt(0).toLowerCase() + text.slice(1).replace(/\s+/g, "")
  );

  return (
    <TheOptions value={shelf} onChange={trigger} open={open} onMouseLeave={trigger}>
      {texts.map((text, index) => (
        <Option
          key={shelves[index]}
          value={shelves[index]}
          checked={shelves[index] === shelf}
          onClick={e => {
            changeShelf(book, e.target.getAttribute("value"));
            trigger();
            console.log(e.target.getAttribute("value"));
          }}
        >
          {text}
        </Option>
      ))}
    </TheOptions>
  );
}

export default Options;
