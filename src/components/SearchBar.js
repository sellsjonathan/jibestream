import React from 'react';

import Icon from './Icon';

class SearchBar extends React.Component {
  componentDidMount() {
    console.log('test', this.props);
    this.renderAutoComplete();
  }

  componentDidUpdate() {
    if (!this.props.google || !this.props.map.current) {
      return;
    }
    this.renderAutoComplete();
  }

  onSubmit(event) {
    event.preventDefault();
  }

  renderAutoComplete() {
    if (!this.props.google || !this.props.map.current) {
      return;
    }
    const { google } = this.props;
    const gMap = this.props.map.map;
    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
    autocomplete.bindTo('bounds', gMap);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        gMap.fitBounds(place.geometry.viewport);
      } else {
        gMap.setCenter(place.geometry.location);
        gMap.setZoom(17);
      }
      console.log(place.geometry.location);
      //this.setState({ position: place.geometry.location });
      this.props.getPosition(place.geometry.location);
    });
  }

  render() {
    return (
      <header className="searchContainer" onSubmit={this.onSubmit}>
        <div className="title">
          <h1>Jonathan Sells</h1>
          <h2>for Jibestream</h2>
        </div>
        <form>
          <input
            placeholder="Enter a location"
            type="text"
            ref={ref => (this.autocomplete = ref)}
          />
          <button type="submit">
            <Icon size="sm" /> <span>Search map</span>
          </button>
        </form>
      </header>
    );
  }
}

export default SearchBar;
