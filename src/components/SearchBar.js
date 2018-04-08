import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <footer>
        <input type="text" className="google-input" />
        <button className="google-btn">Submit</button>
      </footer>
    );
  }
}

export default SearchBar;
